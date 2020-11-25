import ShopManager from '@src/manager/v2/shop'
const shopManager = new ShopManager()
const resolvers = {
  Query: {
    shopList: async (_: any, args: any) => {
      console.log(args)
      const res = await shopManager.getList(args)
      console.log(res)

      if (res.success) {
        return res.data.data
      }
      return []
    },
   
  },
  Mutation:{
    createShop: async (_: any, args: any) => {
      const res = await shopManager.create(args)
      console.log(res)

      if (res.success) {
        return res
      }
      return
    }
  }
}

module.exports = resolvers