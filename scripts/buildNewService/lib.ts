import fs from 'fs'

export enum FILE_TYPE {
  API = 'api',
  SERVICE = 'service',
  DB = 'db',
  MANAGER = 'manager',
}

const upperCaseFirstWord = (str: string) => {
  let cloneStr: any = str
  cloneStr = cloneStr.split('')
  cloneStr[0] = cloneStr[0].toUpperCase()
  cloneStr = cloneStr.join('')
  return cloneStr
}
const lowerCaseFirstWord = (str: string) => {
  let cloneStr: any = str
  cloneStr = cloneStr.split('')
  cloneStr[0] = (cloneStr[0] as string).toLowerCase()
  cloneStr = cloneStr.join('')
  return cloneStr
}
const buildFileContent = (filePath: string, replaceName: string, type: FILE_TYPE): string => {
  const buf = fs.readFileSync(filePath)
  let resultStr = buf.toString().replace(/XXXXXX/gi, upperCaseFirstWord(replaceName))
  resultStr = buf.toString().replace(/xXXXXX/gi, lowerCaseFirstWord(replaceName))

  return resultStr
}
const writeServiceFile = (filePath: string, fileContent: string): void => {
  try {
    fs.writeFileSync(filePath, fileContent)
    console.log(filePath + '创建成功')
  } catch (error) {
    console.warn(error);

  }
}
export {
  buildFileContent,
  writeServiceFile
}