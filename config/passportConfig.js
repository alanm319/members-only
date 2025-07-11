const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy  = require('passport-local').Strategy;
const queries = require('../db/queries');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await queries.getUserByUsername(username);

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  //(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await queries.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});