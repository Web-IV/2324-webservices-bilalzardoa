const Router = require('@koa/router');
const destinationReviewRouter = require('../rest/destinationReviewRoutes');
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

  destinationReviewRouter(router);
  installHealthRoutes(router); // Install health endpoints

  app.use(router.routes())
     .use(router.allowedMethods());
};
