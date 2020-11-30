/**
 * @description 商品 graphql
 */

import {
  Resolver, Query, Field, Arg, Args,
  Int, ObjectType, ArgsType, ID, Float
} from "type-graphql";
import ProductManager from "@src/manager/v2/product";
const productManager = new ProductManager
import ProductService from "@src/services/v2/product";
const productService = new ProductService()
import { Response, ListBody, ListCommonParams } from '@src/graphql/components/lib/type'

@ObjectType()
class SkuGroup {
  @Field(type => Float)
  salePrice: number
  @Field()
  code: string
}

@ObjectType()
class Goods {
  @Field(type => ID)
  id: number
  @Field()
  name: string
  @Field()
  mainImage: string
  @Field()
  desc: string
  @Field(type => Float)
  prince: number
  @Field(type => [SkuGroup])
  skuGroup: SkuGroup[]
  @Field(type => Int)
  shopId: number
  @Field(type => Int)
  belong: number
}

@ObjectType()
class GoodsListBody extends ListBody {
  @Field(type => [Goods])
  data: Goods[]
}
@ObjectType()
class GoodsListResponse extends Response {
  @Field(type => GoodsListBody)
  data: GoodsListBody
}
@ArgsType()
class GoodsListParams extends ListCommonParams {
  @Field(type => Int)
  shopId: number
}

@ArgsType()
class RecommendCategoryGoodsListParams extends ListCommonParams {
  @Field(type => Int)
  categoryId: number
}
@Resolver()
class GoodsResolver {
  @Query(retunrs => GoodsListResponse)
  async getGoodsList(@Args() args: GoodsListParams): Promise<any> {
    const result = await productManager.getList(args)
    return result
  }
  @Query(returns => Response)
  async getGoodsDetail(@Arg("id") id: number): Promise<any> {
    const result = await productManager.getInfo(id)
    const cloneResult = { ...result }
    productService.skuGroupOriginDataToCodeHandler(cloneResult.data)
    console.log(cloneResult)
    return cloneResult
  }
  @Query(returns => GoodsListResponse)
  async getRecommendCategoryGoodsList(@Args() args: RecommendCategoryGoodsListParams): Promise<any> {
    const result = await productManager.getList({
      pageNo: args.pageNo,
      pageSize: args.pageSize,
      belong: args.categoryId
    })
    const cloneResult = { ...result }
    const { data: { data: realData } } = cloneResult
    if (realData) {
      const cloneRealData = [...realData]
      cloneRealData.forEach((crd: any, index: number) => {
        productService.skuGroupOriginDataToCodeHandler(crd)
      })
      // cloneResult.data.data = cloneRealData
    }

    return cloneResult
  }
}


export {
  GoodsResolver
}