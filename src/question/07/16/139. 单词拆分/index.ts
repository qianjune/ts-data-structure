// 139. 单词拆分
// 解题方式：动态规划
function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      console.log([...dp]);

      if (dp[i] == true) break;
      if (dp[j] == false) continue;
      const str = s.slice(j, i);
      console.log(str);

      if (wordSet.has(str) && dp[j]) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}
console.log(wordBreak("leetcodecode", ["leet", "code"]));

export { wordBreak };
