const { getKnex, tables } = require('../data/index'); // Adjust the path accordingly
const { getLogger } = require('../core/logging');

const SELECT_COLUMNS = [
  `${tables.users}.id`,
  'username',
  'email',
  'password'
  // Add other user-related columns as needed
];

const getAllusers = async () => {
  return getKnex()(tables.users).select().orderBy('username', 'ASC');

}

const findCount = async () => {
  const [count] = await getKnex()(tables.users).count();
  return count['count(*)'];
};

const getUserById = async (id) => {
   return await getKnex().from(tables.users).where('id', id).first();

};

const findByEmail = (email) => {
  return getKnex()(tables.users).where('email', email).first();
};

const findByUsername = (username) => {
  return getKnex()(tables.users).where('username', username).first();
};

const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.users).delete().where('id', id);
    if (rowsAffected > 0) {
      getLogger().info('User deleted successfully', { id });
    } else {
      getLogger().warn('User not found for deletion', { id });
      return rowsAffected > 0;
    }
  } catch (error) {
    getLogger().error('Error in deleteById', {
      error,
    });
    throw error;
  }
};



const login = async (username) => {
  try {
    const user = await getKnex()(tables.users).where('username', username).first();
 

    if (!user) {
      throw ServiceError.unauthorized('Invalid credentials');
    }

    return user;
  } catch (error) {
    getLogger().error('Error when logging in', {
      error,
    });
    throw error;
  }
};

const role = require('../core/roles')

const register = async (username,email,hashedPassword) =>{
  try{
    await getKnex()(tables.users).insert({
      username : username,
      email : email,
      roles : JSON.stringify([role.USER]),
      password_hash:hashedPassword,
    });
    return "registered succesfully"
  }catch(error){
    getLogger().error('Error when registering', {
      error,
    });
    throw error;
  }
  }


module.exports = {
  getAllusers,
  getUserById,
  findCount,
  findByEmail,
  deleteById,
  findByUsername,
  login,
  register
};


