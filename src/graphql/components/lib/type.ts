import { Field, ID, Int, ObjectType, ArgsType } from 'type-graphql'


@ObjectType()
class Response {
  @Field()
  success: boolean

  @Field()
  msg: string
}

@ObjectType()
class ListBody {
  @Field()
  empty: boolean

  @Field(type => Int)
  total: number

  // @Field(type => [T])
  // data: T[]
}

@ArgsType()
class ListCommonParams {
  @Field(type => Int)
  pageSize: number

  @Field(type => Int)
  pageNo: number
}
export { Response, ListBody, ListCommonParams }