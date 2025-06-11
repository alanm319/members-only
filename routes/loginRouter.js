const passport = require('passport');
const { body, validationResult} = require('express-validator');
const { Router } = require('express');
const loginRouter = Router();


const validateLogin = [
  body('username').trim()
    .isLength({ min: 2, max: 36 }).withMessage('username must be between 2 and 36 characters long'),
  body('password').trim()
    .isLength({ min: 8, max: 256}).withMessage('password must be between 8 and 256 characters long'),
];

function loginValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('log-in', { 
      errors: errors.array(),
    });
  }
  next();
}

loginRouter.get('/', (req, res) => res.render('log-in'));
loginRouter.post('/', validateLogin, loginValidation ,passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in',
}));

module.exports = loginRouter;