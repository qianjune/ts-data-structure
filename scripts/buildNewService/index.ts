import { join,dirname } from 'path'
import fs from 'fs'
const serviceName = process.argv[2]

console.log('准备开始创建新service...')
if (!serviceName) {
  console.warn("请输入service name");

  process.exit()
}
const basePath = join(__dirname, '../','../','src')

const dbPath = join(basePath, 'db', 'models', 'v2')
const apiPath = join(basePath, 'api', 'v2')
const servicePath = join(basePath, 'services', 'v2')
const managerPath = join(basePath, 'manager', 'v2')
const pathGroup = [
  {
    key: 'db',
    path: dbPath
  }, {
    key: 'api',
    path: apiPath
  }, {
    key: 'service',
    path: servicePath
  }, {
    key: 'manager',
    path: managerPath
  }
]
pathGroup.forEach(item => {
  const logName = `${serviceName} ${item.key}文件是否存在`
  const checkFilePath = join(item.path, serviceName + '.ts')
  console.log(checkFilePath)
  const isFileExist = fs.existsSync(checkFilePath)
  if (isFileExist) {
    console.log(logName, isFileExist)
  } else {
    console.log(logName, isFileExist)
  }
})
const isFileExist = fs.existsSync(dbPath)
console.log('文件是否存在', isFileExist)