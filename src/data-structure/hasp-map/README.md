### 哈希函数

n代表放入的元素
如果地址是链表复杂度n/m
如果地址是平衡树复杂度log(n/m)

原则：一致性（同样的x产生同样的y）/高效性（计算哈希值）/均匀性

1. 把“键”转换为索引的函数
2. 不同的键通过函数产生了相同的索引，称为哈希冲突，解决冲突
空间换时间
无限的空间，时间复杂度1
空间为1，时间复杂度就是n，类似链表
索引的分布越均匀越好

#### 复杂度分析

对于哈希表来说，当元素从n变成upperTol * n; 空间地址增倍，平均复杂度为O(1)
同理缩容也是一样

#### 整形哈希函数设计

难点：大整
例：身份证号
通常做法：取模M，比如取最后四位，（取最后6为会产生分布不均匀，多的两位日日期，最多到31）
解决方法：模一个素数
(<https://planetmath.org/goodhashtableprimes>) // 根据数据规模选择素数表

### 浮点型

将存储的01010看成整形后处理

### 字符串

code = c*26^3+o*26^2+d*26^1+e*26^0
hash(code) = (c*B^3+o*B^2+d*B^1+e*B^0)%M
hash(code) = ((((c*B)+o)*B+d)*B+e)%M
hash(code) = ((((c%M*B)+o%M)*B+d%M)*B+e%M) // 防止整形溢出
int hash = 0
for(let i=0; i<str.length; i++){
  hash=(hash*B+str.charAt(i))%M
}

166 = 1*10^2+6*10^1+6*10^0

### 年月日

当成字符串处理（年，月，日）

### java的hashCode

1. 对于object，如果没有覆盖hashCode，系统会根据内存地址去产生一个hashCode
2. 覆盖equals
equals(Object o){
  if(o===this) return true
  if(o===null) return false
  if(o.getClass()!==this.getClass()) return false
  Student another = (Student)o
  return this.grade === another.grade &&
  this.cls === another.cls &&
  this.firstName === another.firstName &&
  this.lastName === another.lastName
}
