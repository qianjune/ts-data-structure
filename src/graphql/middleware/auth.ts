import { Context, Next } from "koa"

const main = async (ctx: Context, next: Next) => {
  ctx.user = { name: 'June', age: Math.random() }
  return next()
}

export default main