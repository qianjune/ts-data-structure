// 406. 根据身高重建队列
// 解题方式：先排序 再插入

function reconstructQueue(people: number[][]): number[][] {
  people.sort((a, b) => b[0] - a[0] || a[1] - b[1]);
  let res: number[][] = [];
  console.log(people);
  for (const p of people) {
    if (p[1] === 0) {
      res.unshift(p);
    } else {
      res = [...res.slice(0, p[1]), p, ...res.slice(p[1], res.length)];
    }
  }
  return res;
}
export { reconstructQueue };
