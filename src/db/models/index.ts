import Address from './address'
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
import ShoppingCart from './v2/shoppingCart'
// import ShopProductRelation from './v2/shopProductRelation'

Address.belongsTo(Member, {
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
  foreignKey: 'shopId'
})
Product.hasMany(ShoppingCart, {
  foreignKey: 'productId'
})
User.hasMany(ShoppingCart, {
  foreignKey: "uid"
})

export {
  Address,
  IdCard,
  Member, User, Points, Right, RightPackage, RightRelation, ShopModel,
  Product,
  ShoppingCart
}