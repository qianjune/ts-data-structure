/**
 * @description 括号 问题
 */

// 20.有效的括号
const leftOf = (s: string): string => {
  if (s === ")") return "(";
  if (s === "]") return "[";
  if (s === "}") return "{";
};
const isValidBracket = (str: string) => {
  const left = [];
  for (const s of str) {
    if (["(", "[", "{"].includes(s)) {
      left.push(s);
    } else {
      if (left.length > 0 && leftOf(s) === left[left.length - 1]) {
        left.pop();
      }
    }
  }
  return left.length === 0;
};

// 921.使括号有效的最小插入
const minAddToValidBracket = (str: string) => {
  let need = 0; // 左括号维护
  let res = 0; // 右括号维护
  for (const s of str) {
    if (s === "(") {
      need++;
    } else {
      need--;
      if (need == -1) {
        res++;
        need = 0;
      }
    }
  }
  return res + need;
};

// 1541.平衡括号串的最少插入
const minAddToValidBracket1 = (str: string) => {
  let need = 0; // 需要的右括号维护
  let res = 0; // 需要插入的括号
  for (const s of str) {
    if (s === "(") {
      need += 2;
      if (need % 2 === 1) {
        // 前面有()( 类似这种
        res++;
        need--;
      }
    } else {
      need--;

      if (need == -1) {
        // 需要一个左括号
        res++;
        // 需要一个更多的右括号
        need = 1;
      }
    }
  }
  return res + need;
};
