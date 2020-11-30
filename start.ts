import 'module-alias/register'
import 'reflect-metadata'
import config from './config/config'
import bootstrap from './src/graphql/index'

import app from './app'
import ConsoleBox from '@src/utils/console_box'
bootstrap().then((server) => {
  server.applyMiddleware({ app: app as any })
  app.listen(config.port)
  ConsoleBox.info(`server is running on port ${config.port}${server.graphqlPath}`)
})



// rx 学习
// import './experiment/rx-dev/index'
// 算法
// import './experiment/algorithm/index'