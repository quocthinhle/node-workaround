const logger = require('../../helpers/loggers');

module.exports = {
    httpErrorHandler: (app) => {
        // eslint-disable-next-line no-unused-vars
        app.use((err, req, res, _) => {
            logger.error(err);
            res.status(err.status || 500);
        });
    },
};
