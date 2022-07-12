const logger = require('../../helpers/loggers');

module.exports = {
    httpErrorHandler: (app) => {
        app.use(function (err, req, res, next) {
            logger.error(err);
            res.status(err.status || 500);
        });
    }
}