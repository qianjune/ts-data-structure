export const sequelizeErrHandler = (error: any) => {
  console.log("alter error");
  console.log(`msg: ${error.message}`);
  console.log(`sql: ${error.sql}`);
};
