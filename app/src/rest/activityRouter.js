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
      id: Joi.number().integer().positive(),
      },
  }
  /*const getActivityById = async (ctx) => {
    const activityId = ctx.params.activityId;

    try {
      const activity = await activityService.getActivityById(activityId);
      ctx.body = activity;
    } catch (error) {
      ctx.status = error.statusCode || 500;
      ctx.body = { error: error.message };
    }
  }*/
  const getActivityById = async (ctx) => {
    const activityId = ctx.params.activityId;
  
    try {
      const activity = await activityService.getActivityById(activityId);
  
      // Check if the userId in the activity is equal to the authenticated user's id
      if (ctx.state.user && activity && ctx.state.user.id === activity.userId) {
        ctx.body = activity;
      } else {
        ctx.status = 403; // Forbidden
        ctx.body = { error: 'Not authorized to access this resource.' };
      }
    } catch (error) {
      ctx.status = error.statusCode || 500;
      ctx.body = { error: error.message };
    }
  };
  

  getActivityById.validationScheme = {
    params: {
      activityId: Joi.number().integer().positive(),
      id: Joi.number().integer().positive(),
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
        const activity = await activityService.updateActivityEntry(activityId, newContent);
        if (ctx.state.user && activity && ctx.state.user.id === activity.userId) {
          ctx.body = activity;
        } else {
          ctx.status = 403; // Forbidden
          ctx.body = { error: 'Not authorized to access this resource.' };
        }    
      } catch (error) {
        ctx.status = error.statusCode || 500;
        ctx.body = { error: error.message };
    }
}

updateActivityEntry.validationScheme = {
  params: {
    activityId: Joi.number().integer().positive().required(),
    id: Joi.number().integer().positive(),

},
    body: Joi.object({
      newContent: Joi.string().required(),
    }),
}
const deleteById = async (ctx) => {
    const activityId = ctx.params.activityId;

    try {
      const activity = await activityService.deleteActivityEntry(activityId);
      if (ctx.state.user && activity && ctx.state.user.id === activity.userId) {
        ctx.body = activity;
      } else {
        ctx.status = 403; // Forbidden
        ctx.body = { error: 'Not authorized to access this resource.' };
      }    
      } catch (error) {
      ctx.status = error.statusCode || 500;
      ctx.body = { error: error.message };
    }
  }

  deleteById.validationScheme = {
    params: {
      activityId: Joi.number().integer().positive(),
      id: Joi.number().integer().positive(),
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

  router.post('/add',validate(addActivityEntry.validationScheme),passportJwtMiddleware,addActivityEntry)

  router.put('/user/:id/:activityId',validate(updateActivityEntry.validationScheme) ,passportJwtMiddleware,authorizeUser,updateActivityEntry)
  // Endpoint to delete a activity entry by its ID
  router.get('/user/:id',validate(getAllactivitiesByUserId.validationScheme),passportJwtMiddleware,authorizeUser,getAllactivitiesByUserId)
  // Endpoint to get a activity by its ID
  router.get('/user/:id/:activityId' ,validate(getActivityById.validationScheme),passportJwtMiddleware,authorizeUser,getActivityById)
  router.delete('/user/:id/:activityId', validate(deleteById.validationScheme),passportJwtMiddleware,authorizeUser,deleteById);

  app.use(router.routes());
  app.use(router.allowedMethods());
};
