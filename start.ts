import 'module-alias/register'
import app,{server} from './app'

app.listen(3111)
console.log(`server is running on port 3111${server.graphqlPath}`)