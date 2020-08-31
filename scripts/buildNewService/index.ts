import { join } from 'path'
import fs from 'fs'
import { buildFileContent, writeServiceFile, FILE_TYPE } from './lib';

console.log('process.argv', process.argv)
const args = process.argv.slice(2, process.argv.length)
const fileType = ['--api', '--db', '--service', '--manager']
let defaultConfig: { [keyName: string]: boolean } = {
  api: false,
  db: false,
  service: false,
  manager: false
}
if (args.includes('--all')) {
  defaultConfig = {
    api: true,
    db: true,
    service: true,
    manager: true
  }
} else {
  fileType.forEach((ft: string) => {
    if (ft.indexOf('--') > -1 && args.includes(ft)) {
      defaultConfig[ft.replace('--', '')] = true
    }
  })
}

console.log('defaultConfig', defaultConfig)
const serviceName = args[0]

console.log('准备开始创建新service...')
if (!serviceName) {
  console.warn("请输入service name");

  process.exit()
}
const basePath = join(__dirname, '../', '../')
const srcPath = join(basePath, 'src')
const dbPath = join(srcPath, 'db', 'models', 'v2')
const apiPath = join(srcPath, 'api', 'v2')
const servicePath = join(srcPath, 'services', 'v2')
const managerPath = join(srcPath, 'manager', 'v2')
// --db --api --service --manager 根据参数生成文件
const pathGroup = [
  {
    key: FILE_TYPE.DB,
    path: dbPath
  }, {
    key: FILE_TYPE.API,
    path: apiPath
  }, {
    key: FILE_TYPE.SERVICE,
    path: servicePath
  }, {
    key: FILE_TYPE.MANAGER,
    path: managerPath
  }
]
const tempPath = join(basePath, 'scripts/buildNewService', 'template')
pathGroup.forEach(item => {
  if (defaultConfig[item.key]) {
    const logName = `${serviceName} ${item.key}文件是否存在`
    const checkFilePath = join(item.path, serviceName + '.ts')
    console.log(checkFilePath)
    const isFileExist = fs.existsSync(checkFilePath)
    if (isFileExist) {
      console.log(logName, isFileExist)
      // 是否要覆盖
    } else {
      console.log(logName, isFileExist)

      const fileContent = buildFileContent(join(tempPath, item.key + '.ts'), serviceName, item.key)
      writeServiceFile(join(item.path, serviceName + '.ts'), fileContent)
    }
  }

})