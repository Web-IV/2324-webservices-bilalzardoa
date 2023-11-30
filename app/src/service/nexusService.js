const userRepo = require('../repository');

const getAll = async () => {
  const items = await userRepo.findAllWithCount();
  return {
    items,
    count,
  };
};

const createFriend = async ({ userId, friendId }) => {
  const friend = await userRepo.createFriend({ userId, friendId });
  return friend
};


const getById = async (id) => {
  const user = await userRepo.findById(id);
  return user;
};

const updateById = async (id, updatedUserData) => {
  const updatedUser = await userRepo.updateById(id, updatedUserData);
  return updatedUser;
};

const deleteById = async (id) => {
  const deletedUser = await userRepo.deleteById(id);
  return deletedUser;
};

module.exports = {
  getAll,
  getById,
  updateById,
  deleteById,
  createFriend,
};
