const eu = require('../../app/i18/eu');


function replace(source, options) {
  const { lang } = options;
  console.log('----------------------------------------------------');
  console.log(require('../../app/i18/cn'));

  const langData = {
    cn: require('../../app/i18/cn'),
    eu,
  };
  let newSource = source;
  const searchResult = source.match(/WORDS(.[A-Z]+)+/g);
  if (searchResult) {
    for (let i = 0; i < searchResult.length; i++) {
      const searchData = searchResult[i];
      const pathArr = [];
      _buildGroups(searchData, pathArr);
      pathArr.shift();
      newSource = newSource.replace(
        new RegExp(searchResult[i], 'g'),
        _getData(pathArr, langData[lang])
      );
    }
  }

  return newSource;
}

function _getData(pathArr, data) {
  let val = data;
  for (let i = 0; i < pathArr.length; i++) {
    val = val[pathArr[i]];
  }
  return val;
}
function _buildGroups(str, pathArr = []) {
  if (str.indexOf('.') > 0) {
    str.split('.').forEach(item => {
      _buildGroups(item, pathArr);
    });
  } else if (str.indexOf(']') > 0) {
    const pattern = /(?<keyName>\w+)(?<left>\[)(?<index>\w+)(?<right>\])/g;
    const { groups } = pattern.exec(str);
    pathArr.push(groups.keyName);
    pathArr.push(groups.index);
  } else {
    pathArr.push(str);
  }
}

module.exports = replace;
