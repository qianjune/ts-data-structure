function firstUniqChar(s: string): string {
  if (s === "") return " ";
  const map = new Map();
  let w = "";
  for (let i = 0; i < s.length; i++) {
    w = s.charAt(i);
    if (map.has(w)) {
      map.set(w, map.get(w) + 1);
    } else {
      map.set(w, 1);
    }
  }
  for (let i = 0; i < s.length; i++) {
    w = s.charAt(i);
    if (map.get(w) === 1) {
      return w;
    }
  }
  return " ";
}
