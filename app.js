require('dotenv').config();
const express = require('express');
const path = require('node:path');
const passport = require('passport');

const sessionConfig = require('./config/sessionConfig');

const indexRouter = require('./routes/indexRouter');
const signUpRouter = require('./routes/signUpRouter');
const loginRouter = require('./routes/loginRouter');
const createPostRouter = require('./routes/createPostRouter');

const app = express();

app.use(express.urlencoded({ extended: false }));
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(sessionConfig());
app.use(passport.session());
// app.use((req, res, next) => {
//   console.log(req.user);
//   next();
// });
require('./config/passportConfig');

app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);
app.use('/log-in', loginRouter);
app.use('/create-post', createPostRouter);

app.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.use((req, res, next) => {
  res.status(404);
  res.render('404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});