const testRouter = require('../../modules/test/index');
const moduleRouter2 = require('../../modules/thread-modules');
const { adminQueueRouter } = require('../../message-broker/bull-queue/index');

module.exports = {
    configureRouting: (app) => {
        app.use('/api/test', testRouter);
        app.use('/api/test/v2', moduleRouter2);
        app.use('/admin/queue', adminQueueRouter);
    },
};
