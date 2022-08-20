const { Router } = require('express');

const controller = require('./controller');

const authRouter = Router();

authRouter.post('/login', [], controller.login);
authRouter.post('/register', [], controller.register);
authRouter.post('/refresh-token', [], controller.refreshToken);

module.exports = authRouter;
