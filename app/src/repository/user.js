const { tables, getKnex } = require('../data/index')


const findCount = async () => {
  const result = await getKnex()('your_table').count('id as count').first();
  return result.count;
};
const findAll = () => {
    return getKnex()(tables.place) //
      .select()
      .orderBy('name', 'ASC');
  };
const findAllWithCount = async () => {
  const items = await getKnex()('your_table').select('*');
  const count = await findCount();
  return {
    items,
    count,
  };
};

const SELECT_COLUMNS = [
  `${tables.user}.id`,
  'username',
  'email',
  // Add other user-related columns as needed
];

const formatUser = ({ id, username, email, ...rest }) => ({
  id,
  username,
  email,
  // Add other user-related fields as needed
});

const findById = async (id) => {
  const user = await getKnex()(tables.user)
    .where(`${tables.user}.id`, id)
    .first(SELECT_COLUMNS);

  return user && formatUser(user);
};

// Update existing user by ID
const updateById = async (id, updatedUser) => {
  await getKnex()(tables.user)
    .where(`${tables.user}.id`, id)
    .update(updatedUser);

  return findById(id);
};

// Delete user by ID
const deleteById = async (id) => {
  const deletedUser = await findById(id);
  
  await getKnex()(tables.user)
    .where(`${tables.user}.id`, id)
    .del();

  return deletedUser;
};

// ...

const createFriend = async ({ userId, friendId }) => {
  const [id] = await getKnex()(tables.friends).insert({
    user_id: userId,
    friend_id: friendId,
  });

  return id;
};

module.exports = {
  findCount,
  findAllWithCount,
  findById,
  findAll,
  updateById,
  deleteById,
  createFriend,
};
