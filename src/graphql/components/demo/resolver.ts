import ShopManager from '@src/manager/v2/shop'

const shopManager = new ShopManager()

const resolvers = {
  Query: {
    shopList: async (_: any, args: any) => {
      console.log(args)
      const res = await shopManager.getList(args)
      console.log(res)
      return res
    },
    shopDetail: async (_: any, args: any) => {
      console.log(args)
      return await shopManager.getInfo(args.id)
    }
  },
  Mutation: {
    createShop: async (_: any, args: any) => {
      const res = await shopManager.create(args)
      console.log(res)
      return res
    }
  }
}