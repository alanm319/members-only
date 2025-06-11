const pool = require('./pool');

async function createUser(firstName, lastName, username, passwordHash) {
  await pool.query('INSERT INTO users (first_name, last_name, username, password_hash) VALUES ($1, $2, $3, $4);', [
    firstName,
    lastName,
    username,
    passwordHash
  ]);
}

async function getUserByUsername(username) {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1;', [username]);
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1;', [id]);
  return rows[0];
}

async function verifyUser(id) {
  await pool.query('UPDATE users SET verified = true WHERE id = $1;', [id]);
}

async function getAllPosts() {
  const { rows } = await pool.query(`
    SELECT
    posts.*,
    users.id AS user_id,
    users.username,
    users.first_name,
    users.last_name,
    users.verified
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY created_at DESC;
  `);
  return rows;
}

async function createPost(user_id, title, content) {
  await pool.query('INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3);', [
    user_id,
    title,
    content
  ]);
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  verifyUser,
  getAllPosts,
  createPost,
};
