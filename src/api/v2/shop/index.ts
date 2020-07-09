import BaseRouter, { prefix, tag } from "@src/lib/router-decorator";

@prefix('/api/shop')
@tag("店铺相关服务")
class ShopRouter extends BaseRouter {

}

const shopRouter = new ShopRouter()
export default shopRouter.init()