const { Router } = require('express');

const controller = require('./controller');

const userRouter = Router();

userRouter.post('/users', controller.createUser);

module.exports = userRouter;
