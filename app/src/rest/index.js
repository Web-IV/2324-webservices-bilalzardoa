const Router = require('@koa/router');
const NexusRouter = require('./nexusReviewRouter');
const installHealthRoutes = require('../rest/health');

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  NexusRouter(router);
  installHealthRoutes(router); // Install health endpoints

  app.use(router.routes())
     .use(router.allowedMethods());
};
