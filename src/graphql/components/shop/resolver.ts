import ShopManager from "@micro-services/mall-service/src/manager/shop";
import {
  Args,
  ArgsType,
  Field,
  Int,
  Query,
  Resolver,
  Arg,
  Mutation,
} from "type-graphql";
import { Response, ListCommonParams } from "@src/graphql/components/lib/type";
import { ShopListResponse } from "./schema";
const shopManager = new ShopManager();

@Resolver()
class ShopResolver {
  @Query((returns) => ShopListResponse)
  async shopList(@Args() args: ListCommonParams): Promise<any> {
    console.log(args);
    const res = await shopManager.getList(args);
    console.log(res);
    return res;
  }
  @Query((returns) => Response)
  async shopDetail(@Arg("id") id: number): Promise<any> {
    console.log(id);
    return await shopManager.getInfo(id);
  }
  @Mutation((returns) => Response)
  async createShop(@Arg("name") name: string): Promise<any> {
    const res = await shopManager.create({ name });
    console.log(res);
    return res;
  }
}

export { ShopResolver };
