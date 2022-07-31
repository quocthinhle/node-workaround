const logger = require('../../helpers/loggers');

const responseSuccess = (res) => (status, data) => res.status(status).json(data);

const controllerMethod = (_req, res, next) => async (callback) => {
    try {
        res.response = responseSuccess(res);
        return await callback();
    } catch (error) {
        logger.error(error);
        return next(error);
    }
};

module.exports = {
    controllerMethod,
};
