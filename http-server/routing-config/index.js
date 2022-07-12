const testRouter = require('../../modules/test/index');

module.exports = {
    configureRouting: (app) => {
        app.use(testRouter);
    },
};