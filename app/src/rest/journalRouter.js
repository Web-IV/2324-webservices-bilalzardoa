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
      userId: Joi.number().integer().positive(),
      },
  }
  const getJournalById = async (ctx) => {
    const journalId = ctx.params.journalId;

    try {
      const journal = await journalService.getJournalById(journalId);
      ctx.body = journal;
    } catch (error) {
      ctx.status = error.statusCode || 500;
      ctx.body = { error: error.message };
    }
  }

  getJournalById.validationScheme = {
    params: {
      journalId: Joi.number().integer().positive(),
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
}

  
const updateJournalEntry = async (ctx) => {
    const journalId = ctx.params.journalId;
    const { newContent } = ctx.request.body;

    try {
        const success = await journalService.updateJournalEntry(journalId, newContent);
        ctx.body = { success };
    } catch (error) {
        ctx.status = error.statusCode || 500;
        ctx.body = { error: error.message };
    }
}

updateJournalEntry.validationScheme = {
  params: {
    journalId: Joi.number().integer().positive().required(),
},
    body: Joi.object({
      newContent: Joi.string().required(),
    }),
}
const deleteById = async (ctx) => {
    const journalId = ctx.params.journalId;

    try {
      const success = await journalService.deleteJournalEntry(journalId);
      ctx.body = { success };
    } catch (error) {
      ctx.status = error.statusCode || 500;
      ctx.body = { error: error.message };
    }
  }

  deleteById.validationScheme = {
    params: {
      journalId: Joi.number().integer().positive(),
      },
  }
  router.post('/add',validate(addJournalEntry.validationScheme),passportJwtMiddleware,addJournalEntry)

  router.put('/:journalId',validate(updateJournalEntry.validationScheme) ,passportJwtMiddleware,updateJournalEntry)
  // Endpoint to delete a journal entry by its ID
  router.get('/user/:userId',validate(getAllJournalsByUserId.validationScheme),passportJwtMiddleware,getAllJournalsByUserId)
  // Endpoint to get a journal by its ID
  router.get('/:journalId' ,validate(getJournalById.validationScheme),passportJwtMiddleware,getJournalById)
  router.delete('/:journalId', validate(deleteById.validationScheme),passportJwtMiddleware,deleteById);

  app.use(router.routes());
  app.use(router.allowedMethods());
};
