const Koa = require('koa');
const { initializeLogger, getLogger } = require('../core/logging.js');

const config = require('config');

const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

const koaCors = require('@koa/cors');

const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');

const app = new Koa();

const installRest = require('../rest/index.js');
const installHealthRoutes = require('../rest/health.js'); // Update the path

const bodyParser = require('koa-bodyparser');

const { initializeData } = require('./data');


async function main() {
  // Initialize logger
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: {
      NODE_ENV,
    },
  });

  // Initialize data
  await initializeData();

  // Configure CORS
  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }
        // Not a valid domain at this point, let's return the first valid as we should return a string
        return CORS_ORIGINS[0];
      },
      allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
      maxAge: CORS_MAX_AGE,
    })
  );

  // Body parser middleware
  app.use(bodyParser());

  // Logging middleware
  app.use(async (ctx, next) => {
    console.log('Request URL:', ctx.url);
    await next();
  });

  // Welcome message middleware
  app.use(async (ctx, next) => {
    ctx.body = 'Welcome to Nexus';
    await next();
  });

  // Install REST routes and health endpoints
  installRest(app);
  installHealthRoutes(app);

  // Start the server
  app.listen(PORT, () => {
    getLogger().info(`🚀 Server listening on http://localhost:${PORT}`);
  });
}

// Run the main function
main();

// Export the app (optional, depends on your project structure)
module.exports = app;