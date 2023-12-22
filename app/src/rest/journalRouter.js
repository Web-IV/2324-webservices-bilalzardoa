const Router = require('@koa/router');
const journalService = require('../service/journalService'); // Assuming the correct path to your user repository

const passport = require('../core/auth')
const validate = require('../core/validation');
const Joi = require('joi');

// NexusRouter module
module.exports = function NexusRouter(app) {
  const router = new Router({
    prefix: '/journal',
  });

  const passportJwtMiddleware = passport.authenticate('jwt', { session: false });

  // Endpoint to get all journals for a specific user
  const getAllJournalsByUserId = async (ctx) => {
    const userId = ctx.params.userId;

    try {
      const journals = await journalService.getAllJournalsByUserId(userId);
      ctx.body = journals;
    } catch (error) {
      ctx.status = error.statusCode || 500;
      ctx.body = { error: error.message };
    }
  };

  getAllJournalsByUserId.validationScheme = {
    params: {
      id: Joi.number().integer().positive(),
      },
  }
  const getJournalById = async (ctx) => {
    const journalId = ctx.params.journalId;

    try {
      const journal = await journalService.getJournalById(journalId);
      if (ctx.state.user && journal && ctx.state.user.id === journal.userId) {
        ctx.body = journal;
      } else {
        ctx.status = 403; // Forbidden
        ctx.body = { error: 'Not authorized to access this resource.' };
      }
    } catch (error) {
      ctx.status = error.statusCode || 500;
      ctx.body = { error: error.message };
    }
  };

  getJournalById.validationScheme = {
    params: {
      journalId: Joi.number().integer().positive(),
      id: Joi.number().integer().positive(),

      },
  }
 

  const addJournalEntry = async (ctx) => {
    const { userId, date, content } = ctx.request.body;

    try {
      const journalId = await journalService.addJournalEntry(userId, date, content);
      ctx.body = { journalId };
    } catch (error) {
      ctx.status = error.statusCode || 500;
      ctx.body = { error: error.message };
    }
  }

  addJournalEntry.validationScheme = {
    body: Joi.object({
        userId: Joi.number().required(),
        date: Joi.date().required(),
        content: Joi.string().required(),
    }),
    params: {
      id: Joi.number().integer().positive(),
}
}

  
const updateJournalEntry = async (ctx) => {
    const journalId = ctx.params.journalId;
    const { newContent } = ctx.request.body;

    try {
        const journal = await journalService.updateJournalEntry(journalId, newContent);
        if (ctx.state.user && journal && ctx.state.user.id === journal.userId) {
          ctx.body = journal;
        } else {
          ctx.status = 403; // Forbidden
          ctx.body = { error: 'Not authorized to access this resource.' };
        }
      } catch (error) {
        ctx.status = error.statusCode || 500;
        ctx.body = { error: error.message };
      }
    };

updateJournalEntry.validationScheme = {
  params: {
    journalId: Joi.number().integer().positive().required(),
    id: Joi.number().integer().positive(),

},
    body: Joi.object({
      newContent: Joi.string().required(),
    }),
}
const deleteById = async (ctx) => {
    const journalId = ctx.params.journalId;

    try {
      const journal = await journalService.deleteJournalEntry(journalId);
      if (ctx.state.user && journal && ctx.state.user.id === journal.userId) {
        ctx.body = journal;
      } else {
        ctx.status = 403; // Forbidden
        ctx.body = { error: 'Not authorized to access this resource.' };
      }
    } catch (error) {
      ctx.status = error.statusCode || 500;
      ctx.body = { error: error.message };
    }
  };

  deleteById.validationScheme = {
    params: {
      id: Joi.number().integer().positive(),
      journalId: Joi.number().integer().positive(),
      },
  }

  //auth
  const authorizeUser = async (ctx, next) => {
    const requestedUserId = ctx.params.id; // Assuming user ID is in the URL parameter
  
    if (ctx.state.user && ctx.state.user.id === requestedUserId) {
      // User is authorized to access the resource
      await next();
    } else {
      // User is not authorized
      ctx.status = 403; // Forbidden
      ctx.body = { error: 'Not authorized to access this resource.' };
    }
  };
  
  router.post('/add',validate(addJournalEntry.validationScheme),passportJwtMiddleware,addJournalEntry)

  router.put('/user/:id/:journalId',validate(updateJournalEntry.validationScheme) ,passportJwtMiddleware,authorizeUser,updateJournalEntry)
  // Endpoint to delete a journal entry by its ID
  router.get('/user/:id',validate(getAllJournalsByUserId.validationScheme),passportJwtMiddleware,authorizeUser,getAllJournalsByUserId)
  // Endpoint to get a journal by its ID
  router.get('/user/:id/:journalId' ,validate(getJournalById.validationScheme),passportJwtMiddleware,authorizeUser,getJournalById)
  router.delete('/user/:id/:journalId', validate(deleteById.validationScheme),passportJwtMiddleware,authorizeUser,deleteById);

  app.use(router.routes());
  app.use(router.allowedMethods());
};
