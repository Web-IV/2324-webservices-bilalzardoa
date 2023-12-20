// auth.js
const passport = require('koa-passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const userService = require('../service/userService');
const config = require('config'); // Assuming you have a config file for your app

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.auth.jwt.secret,
  issuer: config.auth.jwt.issuer,
  audience: config.auth.jwt.audience,
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await userService.getUserById(payload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
