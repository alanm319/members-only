const { Router } = require('express');
const signupController = require('../controllers/signUpController');
const signUpRouter = Router();

signUpRouter.get('/', signupController.signUpGet);
signUpRouter.post('/', signupController.validateSignUp, signupController.signUpPost);

module.exports = signUpRouter;