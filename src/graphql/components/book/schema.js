import { gql } from 'apollo-server-koa'

const schema = gql`
  enum BookStatus {
    DELETED
    NORMAL
  }

  type Book {
    id: ID
    name: String
    price: Float
    status: BookStatus
    created: Date
  }

  extend type Query{
    book(userName:String,age:Int): Book @auth
  }
`

module.exports = { schema }