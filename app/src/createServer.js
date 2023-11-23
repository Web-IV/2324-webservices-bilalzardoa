const Koa = require('koa');
const app = new Koa();
const port = process.env.PORT || 9000;

const installRest = require('../rest/index.js');
const installHealthRoutes = require('../rest/health.js'); // Update the path

const bodyParser = require('koa-bodyparser');

const destinationReviewService = require('../src/service/destinationReviewService.js'); //

app.use(bodyParser());

app.use(async (ctx, next) => {
  console.log('Request URL:', ctx.url);
  await next();
});

app.use(async (ctx, next) => {
  ctx.body = 'Welcome to the Travel Planner API';
  await next();
});

installRest(app);
installHealthRoutes(app); // Install health endpoints

// logging
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

app.use(async (ctx, next) => {
  logger.info(JSON.stringify(ctx.request));
  logger.info(JSON.stringify(ctx.request.body));
  if (
    ctx.request.method === 'GET' &&
    ctx.request.url === '/api/destinations'
  ) {
    ctx.body = destinationReviewService.getAllDestinations();
  } 
  else {
    // For other requests, respond with a generic message
    ctx.body = 'Goodbye world';
  }
  return next();
});
/////



app.listen(port, () => {
  console.log(`Travel Planner API is running on port ${port}`);
});

module.exports = app;
