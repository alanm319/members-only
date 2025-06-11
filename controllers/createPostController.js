const queries = require('../db/queries');

function createPostGet(req, res) {
   res.render('create-post');
}
function createPostPost(req, res) {
  queries.createPost(req.user.id, req.body.title, req.body.content);
  res.redirect('/');
};

module.exports = {
  createPostGet,
  createPostPost,
}