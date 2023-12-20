const userRepo = require('../repository/userRepo');
const ServiceError = require('../core/serviceError');
const handleDBError = require('./_handleDBerror');

const { hashPassword, verifyPassword } = require('../core/password');
const {generateJWT,verifyJWT,} = require('../core/jwt')
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

/***login and registering */
const login = async (username, password) => {
  const user = await userRepo.login(username);

  if (!user) {
    throw ServiceError.unauthorized('Invalid credentials');
  }
  // Replace with your actual password verification logic
  const isPasswordValid = await verifyPassword(password, user.password_hash);

  if (!isPasswordValid) {
    throw ServiceError.unauthorized('Invalid credentials');
  }

  const token = await generateJWT(user);

  return token;
};

const register = async (username,email,password) => {
  // Hash the user's password before saving it to the database
  const hashedPassword = await hashPassword(password);

  const newUser = await userRepo.register(username,email,hashedPassword);

  const token = await generateJWT(newUser);

  return token;
};

module.exports = {
  getAllUsers,
  getUserById,
  findCount,
  findByEmail,
  findByUsername,
  deleteById,
  login,
  register,
};