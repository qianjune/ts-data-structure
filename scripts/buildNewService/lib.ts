import fs from 'fs'

const buildFileContent = (filePath: string, replaceName: string): string => {
  const buf = fs.readFileSync(filePath)
  const resultStr = buf.toString().replace(/XXXXXX/gi, replaceName)
  return resultStr
}
const writeServiceFile = (filePath: string, fileContent: string): void => {
  const result = fs.writeFileSync(filePath, fileContent)
  console.log(result)
}
export {
  buildFileContent,
  writeServiceFile
}