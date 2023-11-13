const Koa = require('koa');
const app = new Koa();
const port = process.env.PORT || 9000;

app.use(async (ctx, next) => {
  ctx.body = 'Welcome to the Travel Planner API'; 
  await next();
});

// Middleware - Logging
app.use(async (ctx, next) => {
  console.log('Request URL:', ctx.url);
  await next();
});


app.listen(port, () => {
  console.log(`Travel Planner API is running on port ${port}`);
});
