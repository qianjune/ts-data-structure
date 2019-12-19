import Address from './address'
import IdCard from './idCard'
import Member from './member'
import User from './user'

Address.belongsTo(Member, {
  foreignKey: 'memberId'
})

IdCard.belongsTo(Member, {
  foreignKey: 'memberId'
})

Member.belongsTo(User, {
  foreignKey: 'userId'
})

export {
  Address, IdCard, Member, User
}