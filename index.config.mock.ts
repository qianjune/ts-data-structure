interface IndexGoodsInfo {
  id: string
  mainImage: string
  name: string
  sellingPrice: string
  originPrice: string
}

interface IndexConfig {
  carousel: {
    image: string
    to: string
  }[],
  appEntry: {
    icon: string
    to: string
  }[],
  theme: {
    title: string
    icon: string
    key: string
    goods: IndexGoodsInfo[]
  }[]
}