import Address from './address'
import IdCard from './idCard'
import Member from './member'
import User from './user'
import Points from './points'

Address.belongsTo(Member, {
  foreignKey: 'memberId'
})

IdCard.belongsTo(Member, {
  foreignKey: 'memberId'
})

Member.belongsTo(User, {
  foreignKey: 'userId'
})

Points.belongsTo(Member, {
  foreignKey: 'memberId'
})

export {
  Address, IdCard, Member, User, Points
}