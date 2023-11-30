// middleware/validation.js

const validateUser = (ctx, next) => {
    const { username, email } = ctx.request.body;
  
    if (!username || !email) {
      ctx.status = 400;
      ctx.body = { error: 'Username and email are required' };
      return;
    }
  
    // Add more specific validation rules if needed
  
    return next();
  };
  
  const validateFriendConnection = (ctx, next) => {
    const { username, friendname } = ctx.request.body;
  
    if (!username || !friendname) {
      ctx.status = 400;
      ctx.body = { error: 'Username and friendname are required' };
      return;
    }
  
    // Add more specific validation rules if needed
  
    return next();
  };
  
  module.exports = {
    validateUser,
    validateFriendConnection,
  };
  