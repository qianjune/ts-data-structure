### 基数排序法

#### LSD字符串排序法

'1234567'
1: 最重要的一位 most significant
7：最不重要的一位 least significant
只适用于等长的字符串，如手机号，车牌号，电话
不等长的情况可以补0使之等长
从末位逐步向前位排序，每一位都用计数排序法

#### MSD基数排序

从首位开始排序
用于不等长字符串
