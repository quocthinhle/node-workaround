const jwtHelper = require('../helpers/jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const { accesstoken: accessToken } = req.headers;
    const jwtInfo = jwtHelper.verifyAccessToken(accessToken);
    if (!jwtInfo) {
        return res.status(401).json({ message: 'Access token expired' });
    }
    req.userInfo = jwtInfo;
    return next();
};

module.exports = { authMiddleware };
