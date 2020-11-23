import 'module-alias/register'
import config from './config/config'

import app, { server } from './app'
import ConsoleBox from '@src/utils/console_box'

app.listen(config.port)
ConsoleBox.info(`server is running on port ${config.port}${server.graphqlPath}`)

// rx 学习
// import './experiment/rx-dev/index'
// 算法
// import './experiment/algorithm/index'