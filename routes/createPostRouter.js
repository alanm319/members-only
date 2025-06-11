const { Router } = require('express');
const createPostController = require('../controllers/createPostController');
const createPostRouter = Router();

createPostRouter.get('/', createPostController.createPostGet);
createPostRouter.post('/', createPostController.createPostPost);

module.exports = createPostRouter;