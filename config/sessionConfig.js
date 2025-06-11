const session = require('express-session');
const pool = require('../db/pool');
const pgConnect = require('connect-pg-simple');
const pgSession = pgConnect(session);

module.exports = () =>
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    }
  });