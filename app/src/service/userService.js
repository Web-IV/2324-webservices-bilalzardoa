const userRepo = require('../repository/userRepo');
const ServiceError = require('../core/serviceError');
const handleDBError = require('./_handleDBerror');

// Function to get all users
const getAllUsers = async () => {
    const users = await userRepo.getAllusers()
    return users
};

const getUserById = async (id) => {
    const user = await userRepo.getUserById(id);

    if (!user) {
      throw ServiceError.notFound(`No user with id ${id} exists`, { id });
    }
    return user 
    
};

const findCount = async()=>{
  return await userRepo.findCount()
}

const findByEmail = async (email) =>{
  const user =  await userRepo.findByEmail(email)

  if (!user) {
    throw ServiceError.notFound(`No user with email ${email} exists`, { email });
  }
  return user 
}

const findByUsername = async (username) =>{
  const user =  await userRepo.findByUsername(username)
  if (!user) {
    throw ServiceError.notFound(`No user with username ${username} exists`, { username });
  }
  return user 
}

const deleteById = async (id) => {
  return await userRepo.deleteById(id)
}

const addUser = async (user) => {
  try{
    const {username,email,password} = user
    return await userRepo.addUser(username,email,password)
  }catch(error){
    throw handleDBError(error);
  }
}

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  findCount,
  findByEmail,
  findByUsername,
  deleteById
};