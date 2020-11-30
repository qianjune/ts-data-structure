import { gql } from 'apollo-server-koa'
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