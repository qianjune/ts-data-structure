import sequelize from '@root/core/db'

sequelize.authenticate().then(() => {
  console.log('ok')
}).catch(() => {
  console.log('err')
})

sequelize.sync({ force: true }).then(() => {
  console.log('sync ok')

  process.exit()
})
