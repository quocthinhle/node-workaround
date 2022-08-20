const { hashPassword, comparePassword } = require('../../helpers/hashing');
const BaseRepository = require('../../commons/base/repository');
const loggers = require('../../helpers/loggers');
const jwtHelper = require('../../helpers/jsonwebtoken');

class AuthService {
    constructor() {
        this.userRepository = new BaseRepository('User');
        this.tokenRepository = new BaseRepository('UserToken');
    }

    async login({ username, password }) {
        const user = await this.userRepository.findOne({
            where: {
                username,
            },
        });

        if (!user) {
            throw new Error('User_Not_Found');
        }
        const isPasswordMatch = comparePassword(password, user.password);
        if (!isPasswordMatch) {
            throw new Error('Password_Not_Match');
        }

        const { _id, email } = user;

        const jwtToken = jwtHelper.generateToken({
            _id,
            email,
            username,
        });

        // Update token family
        await this.tokenRepository.updateMany({
            where: {
                userId: _id,
            },
            data: {
                expired: true,
            },
        });

        // Save user-token
        await this.saveUserToken(_id, jwtToken.refreshToken);
        return jwtToken;
    }

    async register({ username, password: rawPassword, email }) {
        try {
            const hashedPassword = await hashPassword(rawPassword);
            await this.userRepository.create({
                username,
                email,
                password: hashedPassword,
            });
        } catch (error) {
            loggers.error(error);
            throw new Error('Error_Register');
        }
    }

    // async resetPassword({
    //     username, oldPassword, email, newPassword,
    // }) {
    //     try {

    //     } catch (error) {

    //     }
    // }

    async refreshAccessToken({ currAccessToken, currRefreshToken }) {
        // Check access
        const isAccessTokenAlive = jwtHelper.verifyAccessToken(currAccessToken);
        // Do thing when access token expire
        if (!isAccessTokenAlive) {
            const isRefreshTokenAlive = jwtHelper.verifyRefreshToken(currRefreshToken);
            if (!isRefreshTokenAlive) {
                // Update disable refresh token, require login again
                await this.diasbleUserToken(currRefreshToken);
                throw new Error('RELOGIN_REQUIRED');
                // Reject route
            }
            const storedRefreshToken = await this.getUserToken(currRefreshToken);
            if (storedRefreshToken) {
                const { userId } = storedRefreshToken;
                const user = await this.userRepository.findOne({ where: { _id: userId } });
                const { username, email, _id } = user;
                const newAccessToken = jwtHelper.generateAccessToken({ username, email, _id });
                return newAccessToken;
            }
            throw new Error('INVALID_REFRESH_TOKEN');
        }
        // Do thing when access token still alive
        return currAccessToken;
    }

    async getUserToken(refreshToken) {
        try {
            const userToken = await this.tokenRepository.findOne({
                where: {
                    refreshToken,
                },
            });
            return userToken;
        } catch (error) {
            loggers.error(error);
            return null;
        }
    }

    async diasbleUserToken(refreshToken) {
        try {
            const updateDetail = await this.tokenRepository.updateOne({
                where: {
                    refreshToken,
                },
                data: {
                    expired: true,
                },
            });
            return updateDetail;
        } catch (error) {
            loggers.error(error);
            return null;
        }
    }

    async saveUserToken(userId, refreshToken) {
        const data = {
            userId,
            refreshToken,
        };
        return this.tokenRepository.create(data);
    }
}

module.exports = new AuthService();
