const Koa = require('koa');
const app = new Koa();
const port = process.env.PORT || 9000;

const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
const router = new Router();

const destinationReviewService = require('./service/destinationReviewService'); // 👈 Change the import

router.get('/api/reviews', async (ctx) => {
  ctx.body = destinationReviewService.getAllReviews(); // 👈 Use the new service method
});

router.get('/api/destinations', async (ctx) => {
  ctx.body = destinationReviewService.getAllDestinations(); // 👈 Update the service method
});

router.post('/api/destinations', async (ctx) => {
  try {
    //const { name, latitude, longitude, description, category } = ctx.request.body;

    // 👇 Correct the service method
    const newDestination = destinationReviewService.createReview({
      userId: 1, // Assuming you have a user ID
      destinationId: destinationReviewService.getAllDestinations().length + 1, // Generate a new ID
      rating: 0, // Assuming you want to set a default rating
      comments: 'No comments', // Assuming you want to set default comments
    });

    ctx.body = newDestination;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

module.exports = router;




app.use(router.routes()) // 👈 3
   .use(router.allowedMethods()); // 👈 3

app.use(async (ctx, next) => {
  ctx.body = 'Welcome to the Travel Planner API';
  await next();
});

// Middleware - Logging
app.use(async (ctx, next) => {
  console.log('Request URL:', ctx.url);
  await next();
});

const winston = require('winston');

// Create a logger instance
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
  } else {
    // For other requests, respond with a generic message
    ctx.body = 'Goodbye world';
  }
  return next();
});

app.listen(port, () => {
  console.log(`Travel Planner API is running on port ${port}`);
});
