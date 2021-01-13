import Address from '@src/db/models/v2/address'
// import IdCard from './idCard'
import Member from './member'
// import Points from './points'
import User from './user'
import Right from '@src/db/models/v2/member/right'
import RightPackage from '@src/db/models/v2/member/rightPackage'
import RightRelation from '@src/db/models/v2/member/rightsRelation'
import Level from '@src/db/models/v2/member/level'
import ShopModel from '@src/db/models/v2/shop/shop'
import IndexConfigDb from '@src/db/models/v2/indexConfig'
import ShopUserRelation from '@src/db/models/v2/shopUserRelation'
import Product from '@src/db/models/v2/product/product'
import ShoppingCart from '@src/db/models/v2/shoppingCart'
import ProductBrand from '@src/db/models/v2/product/brand'
import ProductCategory from '@src/db/models/v2/product/category'
import AttributeKey from '@src/db/models/v2/product/attribute_key'
import AttributeValue from '@src/db/models/v2/product/attribute_value'
import CommentModel from '@src/db/models/v2/product/comment'
import FavoritesDb from '@src/db/models/v2/user/favorites'

// import ShopProductRelation from '@src/db/models/v2/shopProductRelation'

// Address.belongsTo(User, {
//   foreignKey: 'memberId'
// })
User.hasMany(Address, {
  foreignKey: 'memberId'
})
// IdCard.belongsTo(Member, {
//   foreignKey: 'memberId'
// })

Member.belongsTo(User, {
  foreignKey: 'userId'
})

// Points.belongsTo(Member, {
//   foreignKey: 'memberId'
// })

Right.hasMany(RightRelation, {
  foreignKey: 'rightId'
})

RightPackage.belongsTo(Level, {
  foreignKey: 'levelId'
})
ShopModel.hasMany(ShopUserRelation, {
  foreignKey: 'shopId'
})
User.hasMany(ShopUserRelation, {
  foreignKey: 'userId'
})
Product.belongsTo(ShopModel, {
  as: 'shopDetail',
  foreignKey: 'shopId'
})
// Product.hasMany(ShoppingCartModel, {
//   foreignKey: 'productId'
// })
// ShoppingCart 代表购物车关系表
ShoppingCart.belongsTo(User, {
  foreignKey: "userId"
})
ShoppingCart.belongsTo(ShopModel, {
  as: 'shop',
  foreignKey: 'shopId'
})
ShoppingCart.belongsTo(Product, {
  as: 'product',
  foreignKey: 'productId'
})
ProductBrand.belongsTo(ShopModel, {
  as: 'shopDetail',
  foreignKey: 'shopId'
})

AttributeKey.hasMany(AttributeValue, {
  as: 'values',
  foreignKey: 'keyId'
})
User.hasMany(CommentModel, {
  foreignKey: 'userId'
})
// CommentModel
export {
  Address,
  // IdCard,
  Member, User,
  // Points,
  Right, RightPackage, RightRelation, ShopModel,
  Product,
  ShoppingCart,
  ProductBrand,
  ProductCategory,
  AttributeKey,
  AttributeValue,
  CommentModel,
  IndexConfigDb,
  FavoritesDb
}