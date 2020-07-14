import 'module-alias/register'
import app,{server} from './app'
import ConsoleBox from '@src/utils/console_box'

app.listen(3111)
ConsoleBox.info(`server is running on port 3111${server.graphqlPath}`)
