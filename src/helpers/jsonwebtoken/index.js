const { sign, verify } = require('jsonwebtoken');
const loggers = require('../loggers');

class JwtHelper {
    generateRefreshToken(userData) {
        return sign(
            userData,
            process.env.REFRESH_TOKEN_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '1m',
                issuer: 'me',
            },
        );
    }

    generateAccessToken(userData) {
        return sign(
            userData,
            process.env.ACCESS_TOKEN_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '30s',
                issuer: 'me',
            },
        );
    }

    generateToken(userData) {
        const accessToken = this.generateAccessToken(userData);
        const refreshToken = this.generateRefreshToken(userData);
        return { refreshToken, accessToken };
    }

    verifyAccessToken(token) {
        try {
            verify(token, process.env.ACCESS_TOKEN_SECRET || 'thisissecret');
            return true;
        } catch (error) {
            loggers.error(error);
            return false;
        }
    }

    verifyRefreshToken(token) {
        try {
            const decoded = verify(token, process.env.REFRESH_TOKEN_SECRET || 'thisissecret');
            return decoded;
        } catch (error) {
            loggers.log(error);
            return false;
        }
    }
}

module.exports = new JwtHelper();
