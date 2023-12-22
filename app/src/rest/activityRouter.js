const Router = require('@koa/router');
const activityService = require('../service/activityService'); // Assuming the correct path to your user repository

const passport = require('../core/auth')
const validate = require('../core/validation');
const Joi = require('joi');

// NexusRouter module
module.exports = function NexusRouter(app) {
  const router = new Router({
    prefix: '/activity',
  });

  const passportJwtMiddleware = passport.authenticate('jwt', { session: false });

  // Endpoint to get all activities for a specific user
  const getAllactivitiesByUserId = async (ctx) => {
    const userId = ctx.params.userId;

    try {
      const activities = await activityService.getAllactivitiesByUserId(userId);
      ctx.body = activities;
    } catch (error) {
      ctx.status = error.statusCode || 500;
      ctx.body = { error: error.message };
    }
  };

  getAllactivitiesByUserId.validationScheme = {
    params: {
      userId: Joi.number().integer().positive(),
      },
  }
  const getActivityById = async (ctx) => {
    const activityId = ctx.params.activityId;

    try {
      const activity = await activityService.getActivityById(activityId);
      ctx.body = activity;
    } catch (error) {
      ctx.status = error.statusCode || 500;
      ctx.body = { error: error.message };
    }
  }

  getActivityById.validationScheme = {
    params: {
      activityId: Joi.number().integer().positive(),
      },
  }
 

  const addActivityEntry = async (ctx) => {
    const { userId, date, content } = ctx.request.body;

    try {
      const activityId = await activityService.addActivityEntry(userId, date, content);
      ctx.body = { activityId };
    } catch (error) {
      ctx.status = error.statusCode || 500;
      ctx.body = { error: error.message };
    }
  }

  addActivityEntry.validationScheme = {
    body: Joi.object({
        userId: Joi.number().required(),
        date: Joi.date().required(),
        content: Joi.string().required(),
    }),
}

  
const updateActivityEntry = async (ctx) => {
    const activityId = ctx.params.activityId;
    const { newContent } = ctx.request.body;

    try {
        const success = await activityService.updateActivityEntry(activityId, newContent);
        ctx.body = { success };
    } catch (error) {
        ctx.status = error.statusCode || 500;
        ctx.body = { error: error.message };
    }
}

updateActivityEntry.validationScheme = {
  params: {
    activityId: Joi.number().integer().positive().required(),
},
    body: Joi.object({
      newContent: Joi.string().required(),
    }),
}
const deleteById = async (ctx) => {
    const activityId = ctx.params.activityId;

    try {
      const success = await activityService.deleteActivityEntry(activityId);
      ctx.body = { success };
    } catch (error) {
      ctx.status = error.statusCode || 500;
      ctx.body = { error: error.message };
    }
  }

  deleteById.validationScheme = {
    params: {
      activityId: Joi.number().integer().positive(),
      },
  }
  router.post('/add',validate(addActivityEntry.validationScheme),passportJwtMiddleware,addActivityEntry)

  router.put('/:activityId',validate(updateActivityEntry.validationScheme) ,passportJwtMiddleware,updateActivityEntry)
  // Endpoint to delete a activity entry by its ID
  router.get('/user/:userId',validate(getAllactivitiesByUserId.validationScheme),passportJwtMiddleware,getAllactivitiesByUserId)
  // Endpoint to get a activity by its ID
  router.get('/:activityId' ,validate(getActivityById.validationScheme),passportJwtMiddleware,getActivityById)
  router.delete('/:activityId', validate(deleteById.validationScheme),passportJwtMiddleware,deleteById);

  app.use(router.routes());
  app.use(router.allowedMethods());
};
