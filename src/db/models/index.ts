import Address from './v2/address'
import IdCard from './idCard'
import Member from './member'
import Points from './points'
import User from './user'
import Right from './right'
import RightPackage from './rightPackage'
import RightRelation from './rightsRelation'
import Level from './level'
import ShopModel from './v2/shop'
import ShopUserRelation from './v2/shopUserRelation'
import Product from './v2/product'
import ShoppingCartModel from './v2/shoppingCart'
import ProductBrand from './v2/product/brand'
import ProductCategory from './v2/product/category'
import AttributeKey from './v2/product/attribute_key'
import AttributeValue from './v2/product/attribute_value'
import CommentModel from './v2/product/comment'
// import ShopProductRelation from './v2/shopProductRelation'

// Address.belongsTo(User, {
//   foreignKey: 'memberId'
// })
User.hasMany(Address, {
  foreignKey: 'memberId'
})
IdCard.belongsTo(Member, {
  foreignKey: 'memberId'
})

User.hasOne(Member)

Points.belongsTo(Member, {
  foreignKey: 'memberId'
})

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
  foreignKey: 'uid'
})
Product.belongsTo(ShopModel, {
  as: 'shopDetail',
  foreignKey: 'shopId'
})
Product.hasMany(ShoppingCartModel, {
  foreignKey: 'productId'
})
User.hasMany(ShoppingCartModel, {
  foreignKey: "uid"
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
  IdCard,
  Member, User, Points, Right, RightPackage, RightRelation, ShopModel,
  Product,
  ShoppingCartModel,
  ProductBrand,
  ProductCategory,
  AttributeKey,
  AttributeValue,
  CommentModel
}