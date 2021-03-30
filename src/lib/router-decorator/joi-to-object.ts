// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import convert from "joi-to-json";

export const joiToObject = (schema: any): { [keyName: string]: any } => {
  const result = convert(schema);
  console.log(result);
  return result;
};
