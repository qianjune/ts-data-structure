import fs from 'fs'

const buildFileContent = (filePath: string, replaceName: string): string => {
  const buf = fs.readFileSync(filePath)
  const resultStr = buf.toString().replace(/XXXXXX/gi, replaceName)
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