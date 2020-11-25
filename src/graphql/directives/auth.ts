import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-koa'
import { defaultFieldResolver, GraphQLField } from 'graphql'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>): void {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const context = args[2]
      const user = context.ctx.user
      console.log('[CURRENT USER]', { user });
      if (!user) throw new AuthenticationError('Authentication Failure')
      return resolve.apply(this,args)

    }
  }
}

export default AuthDirective