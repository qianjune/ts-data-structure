/**
 * @description 购物车列表 - 个项
 */

export interface ShopInfo {
  id: number;
  name: string;
  logo: string;
}
export interface product {
  id: number;
  name: string;
  sku: string;
  amount: number;
  salePrice: number;
}
export interface ShoppingCartListItemInterface {
  shopInfo: ShopInfo;
  products: product[];
}

class ShoppingCartListItem {
  shopInfo: ShopInfo;
  products: product[];
  constructor(d: ShoppingCartListItemInterface) {
    const { shopInfo, products } = d;
    this.shopInfo = shopInfo;
    this.products = products;
  }
}

export default ShoppingCartListItem;
