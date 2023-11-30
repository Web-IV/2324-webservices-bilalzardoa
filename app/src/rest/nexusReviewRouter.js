const Router = require('@koa/router');
const service = require('../service/nexusService'); // Assuming the correct path to your user repository
const { validateUser, validateFriendConnection } = require('../../middleware/validation'); // Add any necessary validation middleware

const getAllUsers = async (ctx) => {
  const users = await userService.getAll();
  ctx.body = users;
};

const getUserById = async (ctx) => {
  const { id } = ctx.params;
  const user = await userService.getById(id);
  if (user) {
    ctx.body = user;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  }
};

const updateUserById = async (ctx) => {
  const { id } = ctx.params;
  const updatedUserData = ctx.request.body;

  try {
    const updatedUser = await userService.updateById(id, updatedUserData);
    ctx.body = updatedUser;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
};

const deleteUserById = async (ctx) => {
  const { id } = ctx.params;
  await userService.deleteById(id);
  ctx.status = 204;
};

const createFriendConnection = async (ctx) => {
  const { userId, friendId } = ctx.request.body;

  // Add any validation logic if needed
  if (!validateFriendConnection(userId, friendId)) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid friend connection data' };
    return;
  }

  const newFriendConnection = await userService.createFriend({ userId, friendId });

  ctx.body = newFriendConnection;
  ctx.status = 201;
};

const router = new Router({
  prefix: '/api', // Adjust the prefix as needed
});

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.post('/addFriend', validateUser, createFriendConnection); // Add validation middleware

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
};