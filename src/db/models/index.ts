import Address from "@src/db/models/v2/address";
// import IdCard from './idCard'
// import Points from './points'
import IndexConfigDb from "@src/db/models/v2/indexConfig";
import ShopUserRelation from "@src/db/models/v2/shopUserRelation";
import AttributeKey from "@src/db/models/v2/product/attribute_key";
import AttributeValue from "@src/db/models/v2/product/attribute_value";
import {
  RightPackageDb,
  RightsRelationDb,
  LevelDb,
  LevelGroupDb,
  Member,
  RightDb,
  PointsDb,
  MemberRightRelationDb,
  LevelRightsRelationDb,
  MemberPointsRelationDb,
  LevelGroupLevelRelationDb,
} from "@micro-services/member-service/src/db";
import {
  ShopModel,
  ProductBrand,
  SpuCategoryRelation,
  Product,
  ProductCategory,
  ShoppingCart,
} from "@micro-services/mall-service/src/db";
import {
  CommentModel,
  SafeListDB,
} from "@micro-services/common-service/src/db";
import User from "@root/micro-services/user-service/src/db/user";
import {
  NoteDB,
  TopicDB,
  TopicNoteRelationDB,
  FavoriteDB as FavoritesDb,
} from "@micro-services/social-service/src/db/index";
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

Product.belongsTo(ShopModel, {
  as: "shopDetail",
  foreignKey: "shopId",
});
// Product.hasMany(ShoppingCartModel, {
//   foreignKey: 'productId'
// })
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

// user - relation - note 关系表 begin 多对多
User.belongsToMany(NoteDB, {
  through: FavoritesDb,
  foreignKey: "uid",
  otherKey: "likeId",
});
NoteDB.belongsToMany(User, {
  through: FavoritesDb,
  foreignKey: "likeId",
  otherKey: "uid",
});
FavoritesDb.belongsTo(User, { foreignKey: "uid" });
FavoritesDb.belongsTo(NoteDB, { foreignKey: "likeId" });
User.hasMany(FavoritesDb, { foreignKey: "uid" });
NoteDB.hasMany(FavoritesDb, { foreignKey: "likeId" });
// user - relation - note 关系表 end

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

// member - relation - points 关系表 begin 多对多
PointsDb.belongsToMany(Member, {
  through: MemberPointsRelationDb,
  foreignKey: "pointId",
  otherKey: "memberId",
});
MemberPointsRelationDb.belongsTo(PointsDb, { foreignKey: "pointId" });
MemberPointsRelationDb.belongsTo(Member, { foreignKey: "memberId" });
Member.hasMany(MemberPointsRelationDb, { foreignKey: "memberId" });
PointsDb.hasMany(MemberPointsRelationDb, { foreignKey: "pointId" });
// member - relation - points 关系表 end

// level - relation - rights 关系表 begin 多对多
RightDb.belongsToMany(LevelDb, {
  through: LevelRightsRelationDb,
  foreignKey: "rightId",
  otherKey: "levelId",
});
LevelDb.belongsToMany(RightDb, {
  through: LevelRightsRelationDb,
  foreignKey: "levelId",
  otherKey: "rightId",
});
LevelRightsRelationDb.belongsTo(LevelDb, { foreignKey: "levelId" });
LevelRightsRelationDb.belongsTo(RightDb, { foreignKey: "rightId" });
RightDb.hasMany(LevelRightsRelationDb, { foreignKey: "rightId" });
LevelDb.hasMany(LevelRightsRelationDb, { foreignKey: "levelId" });
// level - relation - rights 关系表 end

// levelGroup - relation - level 关系表 begin 多对多
LevelGroupDb.belongsToMany(LevelDb, {
  through: LevelGroupLevelRelationDb,
  foreignKey: "levelGroupId",
  otherKey: "levelId",
});
LevelDb.belongsToMany(LevelGroupDb, {
  through: LevelGroupLevelRelationDb,
  foreignKey: "levelId",
  otherKey: "levelGroupId",
});
LevelGroupLevelRelationDb.belongsTo(LevelDb, { foreignKey: "levelId" });
LevelGroupLevelRelationDb.belongsTo(LevelGroupDb, {
  foreignKey: "levelGroupId",
});
LevelGroupDb.hasMany(LevelGroupLevelRelationDb, { foreignKey: "levelGroupId" });
LevelDb.hasMany(LevelGroupLevelRelationDb, { foreignKey: "levelId" });
// levelGroup - relation - level 关系表 end

// note - relation - topic 关系 begin
NoteDB.belongsToMany(TopicDB, {
  through: TopicNoteRelationDB,
  foreignKey: "noteId",
  otherKey: "topicId",
});
TopicDB.belongsToMany(NoteDB, {
  through: TopicNoteRelationDB,
  foreignKey: "topicId",
  otherKey: "noteId",
});
TopicNoteRelationDB.belongsTo(TopicDB, { foreignKey: "topicId" });
TopicNoteRelationDB.belongsTo(NoteDB, {
  foreignKey: "noteId",
});
NoteDB.hasMany(TopicNoteRelationDB, { foreignKey: "noteId" });
TopicDB.hasMany(TopicNoteRelationDB, { foreignKey: "topicId" });
// note - relation - topic 关系 end
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
  PointsDb,
  MemberRightRelationDb,
  MemberPointsRelationDb,
  LevelRightsRelationDb,
  LevelGroupLevelRelationDb,
  NoteDB,
  TopicDB,
  TopicNoteRelationDB,
  SafeListDB,
};
