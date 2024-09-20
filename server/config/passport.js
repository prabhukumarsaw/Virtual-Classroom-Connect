const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ['HS256'], // Ensure the algorithm used for signing JWTs is specified
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        // Find the user by ID from JWT payload
        const user = await User.findById(jwtPayload._id).select('-password'); // Exclude password from the user object
        
        if (user) {
          return done(null, user);
        }
        return done(null, false, { message: 'User not found' });
      } catch (error) {
        console.error('Error verifying JWT:', error);
        return done(error, false, { message: 'Internal server error' });
      }
    })
  );
};
