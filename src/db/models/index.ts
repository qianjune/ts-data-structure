import Address from "@src/db/models/v2/address";
// import IdCard from './idCard'
// import Points from './points'
import Right from "@src/db/models/v2/member/right";
import RightPackage from "@src/db/models/v2/member/rightPackage";
import RightRelation from "@src/db/models/v2/member/rightsRelation";
import Level from "@src/db/models/v2/member/level";
import ShopModel from "@src/db/models/v2/shop/shop";
import IndexConfigDb from "@src/db/models/v2/indexConfig";
import ShopUserRelation from "@src/db/models/v2/shopUserRelation";
import Product from "@src/db/models/v2/product/product";
import ShoppingCart from "@src/db/models/v2/shoppingCart";
import ProductBrand from "@src/db/models/v2/product/brand";
import ProductCategory from "@src/db/models/v2/product/category";
import AttributeKey from "@src/db/models/v2/product/attribute_key";
import AttributeValue from "@src/db/models/v2/product/attribute_value";
import CommentModel from "@src/db/models/v2/product/comment";
import FavoritesDb from "@src/db/models/v2/user/favorites";
import User from "./user";
import Member from "./member";
import SpuCategoryRelation from "./v2/product/spu_category_relation";

// import ShopProductRelation from '@src/db/models/v2/shopProductRelation'

// Address.belongsTo(User, {
//   foreignKey: 'memberId'
// })
User.hasMany(Address, {
  foreignKey: "memberId",
});
// IdCard.belongsTo(Member, {
//   foreignKey: 'memberId'
// })

Member.belongsTo(User, {
  foreignKey: "userId",
});

// Points.belongsTo(Member, {
//   foreignKey: 'memberId'
// })

Right.hasMany(RightRelation, {
  foreignKey: "rightId",
});

RightPackage.belongsTo(Level, {
  foreignKey: "levelId",
});
ShopModel.hasMany(ShopUserRelation, {
  foreignKey: "shopId",
});
User.hasMany(ShopUserRelation, {
  foreignKey: "userId",
});
Product.belongsTo(ShopModel, {
  as: "shopDetail",
  foreignKey: "shopId",
});
// Product.hasMany(ShoppingCartModel, {
//   foreignKey: 'productId'
// })
// ShoppingCart 代表购物车关系表
ShoppingCart.belongsTo(User, {
  foreignKey: "userId",
});
ShoppingCart.belongsTo(ShopModel, {
  as: "shop",
  foreignKey: "shopId",
});
ShoppingCart.belongsTo(Product, {
  as: "product",
  foreignKey: "productId",
});
ProductBrand.belongsTo(ShopModel, {
  as: "shopDetail",
  foreignKey: "shopId",
});

AttributeKey.hasMany(AttributeValue, {
  as: "values",
  foreignKey: "keyId",
});
User.hasMany(CommentModel, {
  foreignKey: "userId",
});
// CommentModel

// spu - relation - category 关系表 begin
Product.belongsToMany(ProductCategory, {
  through: SpuCategoryRelation,
  foreignKey: "spuId",
  otherKey: "categoryId",
});
ProductCategory.belongsToMany(Product, {
  through: SpuCategoryRelation,
  foreignKey: "categoryId",
  otherKey: "spuId",
});
SpuCategoryRelation.belongsTo(Product, { foreignKey: "spuId" });
SpuCategoryRelation.belongsTo(ProductCategory, { foreignKey: "categoryId" });
Product.hasMany(SpuCategoryRelation, { foreignKey: "spuId" });
ProductCategory.hasMany(SpuCategoryRelation, { foreignKey: "categoryId" });
// spu - relation - category 关系表 end

export {
  Address,
  // IdCard,
  Member,
  User,
  // Points,
  Right,
  RightPackage,
  RightRelation,
  ShopModel,
  Product,
  ShoppingCart,
  ProductBrand,
  ProductCategory,
  AttributeKey,
  AttributeValue,
  CommentModel,
  IndexConfigDb,
  FavoritesDb,
  SpuCategoryRelation,
};
