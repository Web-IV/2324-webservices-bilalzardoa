const Router = require('@koa/router');
const userService = require('../service/userService'); // Assuming the correct path to your user repository

const passport = require('../core/auth')
const validate = require('../core/validation');
const Joi = require('joi');
const Role = require('../core/roles');

// NexusRouter module
module.exports = function NexusRouter(app) {
  const router = new Router({
    prefix: '/user', // Adjust the prefix as needed
  });


const passportJwtMiddleware = passport.authenticate('jwt', { session: false });

  //retrieve all users (no validation)
const getAllUsers = async (ctx) => {
    const users = await userService.getAllUsers();
    ctx.status = 200;
    ctx.body = users;
  };
getAllUsers.validationScheme = null;

  
  const getUserById = async (ctx) => {
      const id = ctx.params.id;
      const user = await userService.getUserById(id);
      ctx.status = user ? 200 : 404;
      ctx.body = user || { error: 'User not found' };
  };

  getUserById.validationScheme = {
    params: {
      id: Joi.number().integer().positive(),
    },
  };

  const deleteUserById = async (ctx) => {
    await passportJwtMiddleware(ctx, async () =>{
    await userService.deleteById(ctx.params.id);
    ctx.status = 204;
    })
  };
  deleteUserById.validationScheme = {
    params: {
      id: Joi.number().integer().positive(),
    },
  };

  const findCount = async (ctx) => {
    const count = await userService.findCount()
    ctx.status = 200
    ctx.body =  `there are ${count} users in the database`

  }

  const findByEmail = async (ctx) => {
    await passportJwtMiddleware(ctx, async () =>{
    const email = ctx.params.email
    const user = await userService.findByEmail(email)
    ctx.status = 200
    ctx.body = user
    })
  }
  findByEmail.validationScheme = {
    params: {
      email: Joi.string().email().required(),
    },
  };

  const findByUsername = async (ctx) =>{
    const username = ctx.params.username
    const user = await userService.findByUsername(username)
    ctx.status = 200
    ctx.body = user
  }
  findByUsername.validationScheme = {
    params: {
      username: Joi.string().min(5).required(),
    },
  };

  /**login and registering */


  // Register function
  const register = async (ctx, next) => {
    const {username , email , password} = ctx.request.body
    const password_hash = password
    const token = await userService.register(username,email,password_hash)

    ctx.body = token; 
    ctx.status = 200;
  };
  register.validationScheme = {
    body: Joi.object({
      username: Joi.string().min(5).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  };

  const login = async (ctx, next) => {
    const { username, password } = ctx.request.body;
    try {
      const token = await userService.login(username, password);
      if (!token) {
        ctx.status = 401; // Unauthorized
        ctx.body = { error: 'Invalid credentials' };
        return;
      }
    
        ctx.status = 200;
        ctx.body = {token};
      } catch (tokenError) {
        console.error('Error generating token:', tokenError);
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: 'Token generation failed' };
      }
  };
 
 
  // Validation scheme for login endpoint
login.validationScheme = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

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

const requireAdmin = async (ctx,next) => {
  if (ctx.state.user.roles && ctx.state.user.roles.includes('admin')) {
    // User is also an admin
    await next();
  } else {
    // User is not an admin
    ctx.status = 403; // Forbidden
    ctx.body = { error: 'admin required.' };
  }
}
  // Define user routes
  router.get('/users',validate(getAllUsers.validationScheme),passportJwtMiddleware,requireAdmin,getAllUsers);
  router.get('/count', findCount);
  router.get('/:id',validate(getUserById.validationScheme),passportJwtMiddleware,authorizeUser,getUserById);
  router.get('/email/:email',validate(findByEmail.validationScheme),passportJwtMiddleware,findByEmail);
  router.get('/username/:username',validate(findByUsername.validationScheme),passportJwtMiddleware ,findByUsername);

  //post routes
  //login
  router.post('/login', validate(login.validationScheme), login);
  router.post('/register', validate(register.validationScheme), register);

  //delete routes
  router.delete('/delete/:id',validate(deleteUserById.validationScheme),passportJwtMiddleware,authorizeUser,deleteUserById)
  // Use the router middleware
  app.use(router.routes()).use(router.allowedMethods());
};






