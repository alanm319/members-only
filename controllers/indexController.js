require('dotenv').config();
const queries = require('../db/queries');

async function indexGet(req, res) {
  const posts = await queries.getAllPosts();
  res.render('index', { user: req.user, posts });
};

async function verifyAccount(req, res) {
  const { phrase } = req.body;
  if (phrase.trim().toLowerCase() === process.env.SECRET_PHRASE) {
    await queries.verifyUser(req.user.id);
  }
  res.redirect('/');
}

module.exports = {
  indexGet,
  verifyAccount
};