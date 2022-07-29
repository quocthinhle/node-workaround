const responseSuccess = (res) => (status, data) => {
    return res.status(status).json(data);
}

const controllerMethod = (_req, res, next) => async (callback) => {
    try {
        res.response = responseSuccess(res);
        return await callback();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    controllerMethod,
};
