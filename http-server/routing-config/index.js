const testRouter = require('../../modules/test/index');
const { adminQueueRouter } = require('../../message-broker/bull-queue/index');

module.exports = {
    configureRouting: (app) => {
        app.use('/api/test', testRouter);
        app.use('/admin/queue', adminQueueRouter);
    },
};
