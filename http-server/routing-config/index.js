const testRouter = require('../../modules/test/index');
const moduleRouter2 = require('../../modules/thread-modules');
const userRouter = require('../../modules/users/api');
const authRouter = require('../../modules/auth/api');
const { adminQueueRouter } = require('../../message-broker/bull-queue/index');

module.exports = {
    configureRouting: (app) => {
        app.use('/api/test', testRouter);
        app.use('/api/test/v2', moduleRouter2);
        app.use('/api/test/', userRouter);
        app.use('/admin/queue', adminQueueRouter);
        app.use('/api/test/auth', authRouter);
    },
};
