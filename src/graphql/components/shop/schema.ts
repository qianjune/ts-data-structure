import { Field, ID, Int, ObjectType } from 'type-graphql'
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

export {
  Shop, ShopListBody, ShopListResponse
}
