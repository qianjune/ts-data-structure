// 739. 每日温度
// 解题方式：栈（递减栈）
function dailyTemperatures(temperatures: number[]): number[] {
  const res: number[] = Array(temperatures.length).fill(0);
  const stack: number[] = [];
  for (let i = 0; i < temperatures.length; i++) {
    const t = temperatures[i];
    while (stack.length > 0 && t > temperatures[stack[0]]) {
      res[stack[0]] = i - stack[0];
      stack.shift();
    }
    stack.unshift(i);
  }
  return res;
}
console.log(
  dailyTemperatures([
    73,
    74,
    75,
    71,
    69,
    72,
    76,
    //  73
  ])
);
export { dailyTemperatures };
