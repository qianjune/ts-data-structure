// 647. 回文子串
// 解题方式：中心扩展法 / 动态转移

// 比如对一个字符串 ababa，选择最中间的 a 作为中心点，往两边扩散，第一次扩散发现 left 指向的是 b，right 指向的也是 b，所以是回文串，继续扩散，同理 ababa 也是回文串。

// 这个是确定了一个中心点后的寻找的路径，然后我们只要寻找到所有的中心点，问题就解决了。

// 中心点一共有多少个呢？看起来像是和字符串长度相等，但你会发现，如果是这样，上面的例子永远也搜不到 abab，想象一下单个字符的哪个中心点扩展可以得到这个子串？似乎不可能。所以中心点不能只有单个字符构成，还要包括两个字符，比如上面这个子串 abab，就可以有中心点 ba 扩展一次得到，所以最终的中心点由 2 * len - 1 个，分别是 len 个单字符和 len - 1 个双字符。

function longestPalindrome(s: string): string {
  let res = "";
  for (let center = 0; center < s.length + s.length + 1; center++) {
    // left和right指针和中心点的关系是？
    // 首先是left，有一个很明显的2倍关系的存在，其次是right，可能和left指向同一个（偶数时），也可能往后移动一个（奇数）
    // 大致的关系出来了，可以选择带两个特殊例子进去看看是否满足。
    let left = Math.floor(center / 2);
    let right = left + (center % 2);
    while (
      left >= 0 &&
      right < s.length &&
      s.charAt(left) === s.charAt(right)
    ) {
      const str = s.slice(left, right + 1);
      if (res.length < str.length) {
        res = str;
      }
      left--;
      right++;
    }
  }
  return res;
}
longestPalindrome("babad");
export { longestPalindrome };
