import fs from "fs";

export enum FILE_TYPE {
  API = "api",
  SERVICE = "service",
  DB = "db",
  MANAGER = "manager",
}

const upperCaseFirstWord = (str: string) => {
  let cloneStr: any = str;
  cloneStr = cloneStr.split("");
  cloneStr[0] = cloneStr[0].toUpperCase();
  cloneStr = cloneStr.join("");
  return cloneStr;
};
const lowerCaseFirstWord = (str: string) => {
  let cloneStr: any = str;
  cloneStr = cloneStr.split("");
  cloneStr[0] = (cloneStr[0] as string).toLowerCase();
  cloneStr = cloneStr.join("");
  return cloneStr;
};
const buildFileContent = (data: {
  filePath: string;
  replaceName: string;
  type: FILE_TYPE;
  cname?: string;
  baseMicroServicePath: string;
}): string => {
  const { filePath, replaceName, baseMicroServicePath } = data;
  const cname = data.cname || replaceName;
  const buf = fs.readFileSync(filePath);
  let resultStr = buf
    .toString()
    .replace(/XXXXXX/g, upperCaseFirstWord(replaceName));
  resultStr = resultStr
    .toString()
    .replace(/xXXXXX/g, lowerCaseFirstWord(replaceName));
  resultStr = resultStr
    .toString()
    .replace(/#BASE_LOCATION/g, `@${baseMicroServicePath}`);
  resultStr = resultStr.toString().replace(/cname/g, lowerCaseFirstWord(cname));
  return resultStr;
};
const writeServiceFile = (filePath: string, fileContent: string): void => {
  try {
    fs.writeFileSync(filePath, fileContent);
    console.log(filePath + "创建成功");
  } catch (error) {
    console.warn(error);
  }
};
export { buildFileContent, writeServiceFile };
