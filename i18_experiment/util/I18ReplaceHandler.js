import path from 'path';
import fs from 'fs';

const {
  // resolve,
  join } = path;

class I18ReplaceHandler {
  static i18VariableGroup = []

  static needReplaceGroup = []

  static _loopDirectory(dirPath) {
    fs.readdirSync(dirPath).forEach((fileName) => {
      const childPath = join(dirPath, fileName);
      if (fs.statSync(childPath).isDirectory()) {
        I18ReplaceHandler._loopDirectory(childPath);
      } else if (childPath.endsWith('.js')) {
        I18ReplaceHandler.needReplaceGroup.push(childPath);
      }
    });
  }

  static _combinePath(obj, filePath = '') {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      let thisPath = '';
      if (!filePath) {
        thisPath = keys[i];
      } else {
        thisPath = `${filePath}.${keys[i]}`;
      }
      if (typeof obj[keys[i]] === 'object' && Object.keys(obj[keys[i]]).length > 0) {
        I18ReplaceHandler._combinePath(obj[keys[i]], thisPath);
      } else {
        I18ReplaceHandler.i18VariableGroup.push({
          key: thisPath,
          value: obj[keys[i]],
        });
      }
    }
  }

  static _replace() {
    I18ReplaceHandler.needReplaceGroup.forEach(filePath => {
      console.log(filePath);
      fs.readFile(filePath, 'utf8', (err, files) => {
        let isReplaced = false;
        let cloneFiles = files;
        I18ReplaceHandler.i18VariableGroup.forEach(variable => {
          const regExp1 = new RegExp(`=\\s*'${variable.value}'|=\\s*"${variable.value}"`, 'g');
          const regExp2 = new RegExp(`'${variable.value}'|"${variable.value}"`, 'g');
          const regExp3 = new RegExp(`${variable.value}|${variable.value}`, 'g');
          if (cloneFiles.match(regExp1)) {
            cloneFiles = cloneFiles.replace(regExp1, `={intl.get('${variable.key}')}`);
            isReplaced = true;
          } else if (cloneFiles.match(regExp2)) {
            cloneFiles = cloneFiles.replace(regExp2, `intl.get('${variable.key}')`);
            isReplaced = true;
          } else if (cloneFiles.match(regExp3)) {
            cloneFiles = cloneFiles.replace(regExp3, `{intl.get('${variable.key}')}`);
            isReplaced = true;
          } else {
            return null;
          }
        });
        if (isReplaced) {
          fs.writeFile(filePath, `import intl from 'react-intl-universal';\r${cloneFiles}`, 'utf8', (writeErr) => {
            if (writeErr) return console.warn(`${filePath} replace fail`);
          });
        }
      });
    });
  }

  static _initCombine(obj) {
    I18ReplaceHandler._combinePath(obj, '');
  }

  static replaceChineseToIntlVariable({ replacePath, library }) {
    // const replacePath = resolve(__dirname, 'packages', 'ce-member', 'components', 'BatchTask');
    console.log(replacePath);
    I18ReplaceHandler._loopDirectory(replacePath);
    I18ReplaceHandler._initCombine(library);
    I18ReplaceHandler._replace();
  }
}

export { I18ReplaceHandler };
