import Address from './address'
import IdCard from './idCard'
import Member from './member'
import Points from './points'
import User from './user'
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

export {
  Address, IdCard, Member, User, Points
}