const Koa = require('koa');
const config = require('config');
const crypto = require('crypto');  
const session = require('koa-session'); // Import koa-session

const { initializeLogger, getLogger } = require('./core/logging.js');
const { initializeData ,shutdownData} = require('./data/index.js');
const installRest = require('./rest/index.js');

const installMiddleware = require('./core/installMiddlewares.js'); 


const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

const keys = [crypto.randomBytes(32).toString('hex')];

const passport = require('../src/core/auth.js')

module.exports = async function createServer() { 
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: {
      NODE_ENV,
    },
  });

  await initializeData();

  const app = new Koa();
 
  app.keys = keys;
  app.use(session(app));
  // Configure Passport
  app.use(passport.initialize());
  app.use(passport.session());

  installMiddleware(app);
  installRest(app);

  return {
    getApp() {
      return app;
    },

    start() {
      return new Promise((resolve) => {
        const port = config.get('port'); // 👈
        app.listen(port); // 👈
        getLogger().info(`🚀 Server listening on http://localhost:${port}`); // 👈
        resolve();
      });
    },
  
    async stop() {
      app.removeAllListeners();
      await shutdownData();
      getLogger().info('Goodbye! 👋');
    },
  };
};