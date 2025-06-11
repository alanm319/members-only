const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const queries = require('../db/queries');

function signUpGet(req, res) {
  res.render('sign-up');
}

const validateSignUp = [
  body('username').trim()
    .isLength({ min: 2, max: 36 }).withMessage('username must be between 2 and 36 characters long'),
  body('password').trim()
    .isLength({ min: 8, max: 256}).withMessage('password must be between 8 and 256 characters long'),
];

async function signUpPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('sign-up', { 
      errors: errors.array(),
      data: req.body,
    });
  }
  try {
    const { firstName, lastName, username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    await queries.createUser(firstName, lastName, username, passwordHash);
  } catch (err) {
    return next(err);
  }
  res.redirect('/');
}

module.exports = {signUpGet, signUpPost, validateSignUp};