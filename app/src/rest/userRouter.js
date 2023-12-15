const Router = require('@koa/router');
const userService = require('../service/userService'); // Assuming the correct path to your user repository

const validate = require('../core/validation');
const Joi = require('joi');

// NexusRouter module
module.exports = function NexusRouter(app) {
  const router = new Router({
    prefix: '/nexus', // Adjust the prefix as needed
  });

  //retrieve all users (no validation)
const getAllUsers = async (ctx) => {
    const users = await userService.getAllUsers();
    ctx.status = 200;
    ctx.body = users;
  };
getAllUsers.validationScheme = null;

  
  //add user function
  const addUser = async (ctx) => {
      const user  = ctx.request.body
      const addedUser= await userService.addUser(user)
      ctx.status = 200
      ctx.body = addedUser
  }
  addUser.validationScheme = {
    body: Joi.object({
      username: Joi.string().min(5).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  };

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
    await userService.deleteById(ctx.params.id);
    ctx.status = 204;
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
    const email = ctx.params.email
    const user = await userService.findByEmail(email)
    ctx.status = 200
    ctx.body = user


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
  // Define user routes
  router.get('/allUsers',validate(getAllUsers.validationScheme), getAllUsers);
  router.get('/user/:id',validate(getUserById.validationScheme),getUserById)
  router.get('/users/count',findCount)
  router.delete('/delete/:id',validate(deleteUserById.validationScheme),deleteUserById)
  router.get('/user/email/:email',validate(findByEmail.validationScheme),findByEmail)
  router.get('/user/username/:username', validate(findByUsername.validationScheme), findByUsername);

  router.post('/addUser',validate(addUser.validationScheme),addUser)
 
  // Use the router middleware
  app.use(router.routes()).use(router.allowedMethods());
};






