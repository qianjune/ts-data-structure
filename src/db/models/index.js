import Address from './address'
import IdCard from './idCard'
import Member from './member'
import Points from './points'
import User from './user'
import Test from './test'
console.log(Test)
Address.belongsTo(Member, {
  foreignKey: 'memberId'
})

IdCard.belongsTo(Member, {
  foreignKey: 'memberId'
})

console.log('1')
console.log(Points)
console.log(User)

Points.belongsTo(Member, {
  foreignKey: 'memberId'
})

export {
  Address, IdCard, Member, User, Points
}