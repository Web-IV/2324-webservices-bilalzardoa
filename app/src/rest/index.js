const Router = require('@koa/router');
const userRouter = require('./userRouter');
const journalRouter = require('./journalRouter')
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

  userRouter(router);
  journalRouter(router);
  installHealthRoutes(router); // Install health endpoints

  app.use(router.routes())
     .use(router.allowedMethods());
};
