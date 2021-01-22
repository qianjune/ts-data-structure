import Address from "@src/db/models/v2/address";
// import IdCard from './idCard'
// import Points from './points'
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
import {
  RightPackageDb,
  RightsRelationDb,
  LevelDb,
  LevelGroupDb,
  Member,
  RightDb,
} from "@src/db/models/v2/member";
import User from "./user";
import SpuCategoryRelation from "./v2/product/spu_category_relation";

// import ShopProductRelation from '@src/db/models/v2/shopProductRelation'

// Address.belongsTo(User, {
//   foreignKey: 'memberId'
// })
// User.hasMany(Address, {
//   foreignKey: "memberId",
// });
// // IdCard.belongsTo(Member, {
// //   foreignKey: 'memberId'
// // })

User.hasOne(Member, {
  foreignKey: "userId",
});
Member.belongsTo(User, {
  foreignKey: "userId",
});

// // Points.belongsTo(Member, {
// //   foreignKey: 'memberId'
// // })

// // Right.hasMany(RightsRelationDb, {
// //   foreignKey: "rightId",
// // });

// // RightPackageDb.belongsTo(Level, {
// //   foreignKey: "levelId",
// // });

// // 店铺 - 用户 - 关系表 begin
// ShopModel.belongsToMany(User, {
//   through: ShopUserRelation,
//   foreignKey: "shopId",
//   otherKey: "uid",
// });
// User.belongsToMany(ShopModel, {
//   through: ShopUserRelation,
//   foreignKey: "uid",
//   otherKey: "shopId",
// });
// ShopUserRelation.belongsTo(ShopModel, { foreignKey: "shopId" });
// ShopUserRelation.belongsTo(User, { foreignKey: "uid" });
// ShopModel.hasMany(ShopUserRelation, {
//   foreignKey: "shopId",
// });
// User.hasMany(ShopUserRelation, {
//   foreignKey: "uid",
// });
// // 店铺 - 用户 - 关系表 end

// Product.belongsTo(ShopModel, {
//   as: "shopDetail",
//   foreignKey: "shopId",
// });
// // Product.hasMany(ShoppingCartModel, {
// //   foreignKey: 'productId'
// // })
// // ShoppingCart-User 关系 一对多 begin
// ShoppingCart.belongsTo(User, {
//   foreignKey: "userId",
// });
// User.hasMany(ShoppingCart, {
//   foreignKey: "userId",
// });
// // ShoppingCart-User 关系 一对多 end
// ShoppingCart.belongsTo(ShopModel, {
//   as: "shop",
//   foreignKey: "shopId",
// });
// ShoppingCart.belongsTo(Product, {
//   as: "product",
//   foreignKey: "productId",
// });
// ProductBrand.belongsTo(ShopModel, {
//   as: "shopDetail",
//   foreignKey: "shopId",
// });

// AttributeKey.hasMany(AttributeValue, {
//   as: "values",
//   foreignKey: "keyId",
// });
// User.hasMany(CommentModel, {
//   foreignKey: "userId",
// });
// // CommentModel

// user - relation - shop 关系表 begin 多对多
User.belongsToMany(ShopModel, {
  through: FavoritesDb,
  foreignKey: "uid",
  otherKey: "likeId",
});
ShopModel.belongsToMany(User, {
  through: FavoritesDb,
  foreignKey: "likeId",
  otherKey: "uid",
});
FavoritesDb.belongsTo(User, { foreignKey: "uid" });
FavoritesDb.belongsTo(ShopModel, { foreignKey: "likeId" });
User.hasMany(FavoritesDb, { foreignKey: "uid" });
ShopModel.hasMany(FavoritesDb, { foreignKey: "likeId" });
// user - relation - shop 关系表 end

// spu - relation - category 关系表 begin 多对多
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

// right - relation - package 关系表 begin 多对多
RightDb.belongsToMany(RightPackageDb, {
  through: RightsRelationDb,
  foreignKey: "rightId",
  otherKey: "packageId",
});
RightPackageDb.belongsToMany(RightDb, {
  through: RightsRelationDb,
  foreignKey: "packageId",
  otherKey: "rightId",
});
RightsRelationDb.belongsTo(RightDb, { foreignKey: "rightId" });
RightsRelationDb.belongsTo(RightPackageDb, { foreignKey: "packageId" });
RightDb.hasMany(RightsRelationDb, { foreignKey: "rightId" });
RightPackageDb.hasMany(RightsRelationDb, { foreignKey: "packageId" });
// right - relation - package 关系表 end

export {
  Address,
  // IdCard,
  Member,
  User,
  // Points,
  RightDb,
  RightPackageDb,
  RightsRelationDb,
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
  LevelDb,
  LevelGroupDb,
};
