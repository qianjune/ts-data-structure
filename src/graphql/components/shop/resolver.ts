import ShopManager from '@src/manager/v2/shop'
import { Args, ArgsType, Field, Int, Query, Resolver, Arg } from 'type-graphql'
import { ShopListResponse, Response } from './schema'
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

@ArgsType()
class ListCommonParams {
  @Field(type => Int)
  pageSize: number

  @Field(type => Int)
  pageNo: number
}

@Resolver()
class ShopResolver {
  @Query(returns => ShopListResponse)
  async shopList(@Args() args: ListCommonParams) {
    console.log(args)
    const res = await shopManager.getList(args)
    console.log(res)
    return res
  }


  // @Query(returns => Response)
  // async shopDetail(@Arg("id") id: number): Promise<any> {
  //   console.log(id)
  //   return await this.shopManager.getInfo(id)
  // }
}

export { ShopResolver }
// module.exports = resolvers