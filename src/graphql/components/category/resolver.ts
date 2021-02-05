/**
 * @description 商品 graphql
 */

import {
  Resolver,
  Query,
  Field,
  Arg,
  Args,
  Int,
  ObjectType,
  ArgsType,
  ID,
  Float,
} from "type-graphql";
import CategoryManager from "@micro-services/mall-service/src/manager/category";
const categoryManager = new CategoryManager();
import {
  Response,
  ListBody,
  ListCommonParams,
} from "@src/graphql/components/lib/type";

@ObjectType()
class Category {
  @Field((type) => ID)
  id: number;
  @Field()
  name: string;
  @Field((type) => Int)
  parentId: number;
}

@ObjectType()
class CategoryListBody extends ListBody {
  @Field((type) => [Category])
  data: Category[];
}
@ObjectType()
class CategoryListResponse extends Response {
  @Field((type) => CategoryListBody)
  data: CategoryListBody;
}
// @ArgsType()
// class CategoryListParams extends ListCommonParams {
// }

@Resolver()
class CategoryResolver {
  @Query((retunrs) => CategoryListResponse)
  async getCategoryList(@Args() args: ListCommonParams): Promise<any> {
    const result = await categoryManager.getList(args);
    return result;
  }
}

export { CategoryResolver };
