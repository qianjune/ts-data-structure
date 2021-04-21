export const saveConvertData = (key: string, value: any) => {
  if (!global?.convert) {
    global.convert = {};
  }
  global.convert[key] = value;
};
