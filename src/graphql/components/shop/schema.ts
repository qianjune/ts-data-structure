import { gql } from 'apollo-server-koa'




const schema = gql`
  type Shop{
    id:ID
    name:String
    logo:String
  }

  type Response{
    success:Boolean
    msg:String,
  }

  extend type Query{
    shopList(pageSize:Int,pageNo:Int):[Shop]
  }
  extend type Mutation{
    createShop(name:String):Response
  }
`

module.exports = { schema }