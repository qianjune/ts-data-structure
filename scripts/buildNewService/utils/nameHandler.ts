export const nameHandler = (name: string): string => {
  if (typeof name !== "string") {
    console.error("参数必须为string");
    return name;
  }
  let finalWords = name;
  const firstMatchIndex = name.match(/([A-Z]+)/)?.index || -1;
  let firstWords = "";
  if (firstMatchIndex > 0) {
    firstWords = name.slice(0, firstMatchIndex);
  }

  // 匹配出驼峰字符中的大写开头的字符
  const matchResult = name.match(/([A-Z]+[a-z]+)/g);
  if (Array.isArray(matchResult)) {
    finalWords =
      firstWords +
      "-" +
      matchResult
        .map((m) => {
          return m.toLocaleLowerCase();
        })
        .join("-");
  }
  return finalWords;
};
