const passport = require('passport');

// Protect middleware using Passport JWT strategy
exports.protect = passport.authenticate('jwt', { session: false });
