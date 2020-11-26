import { gql } from 'apollo-server-koa'
import { Field, ID, Int, ObjectType } from 'type-graphql'

const schema = gql`
  type Shop{
    id:ID
    name:String
    logo:String
  }
  type ShopListBody implements ListBody{
    data:[Shop]
    empty:Boolean
    total:Int
  }
  type ShopListResponse implements ListResponse{
    data:ShopListBody
    success:Boolean
    msg:String,
  }
  extend type Query{
    shopList(pageSize:Int,pageNo:Int):ShopListResponse
    shopDetail(id:Int):Response
  }
  extend type Mutation{
    createShop(name:String):Response
  }
`
@ObjectType()
class Shop {
  @Field(type => ID)
  id: number

  @Field()
  name: string

  @Field()
  logo: string
}
@ObjectType()
class ShopListBody {
  @Field()
  empty: boolean

  @Field(type => Int)
  total: number

  @Field(type => [Shop])
  data: Shop[]
}
@ObjectType()
class ShopListResponse {
  @Field()
  success: boolean

  @Field()
  msg: string

  @Field(type => ShopListBody)
  data: ShopListBody
}
@ObjectType()
class Response {
  @Field()
  success: boolean

  @Field()
  msg: string
}
export {
  Shop, ShopListBody, ShopListResponse, Response
}
module.exports = { schema }