const { Router } = require('express');
const indexController = require('../controllers/indexController')
const indexRouter = Router();

indexRouter.get('/', indexController.indexGet);

indexRouter.post('/verify', indexController.verifyAccount)

module.exports = indexRouter;