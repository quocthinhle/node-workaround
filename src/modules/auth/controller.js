const service = require('./service');

// TODO: add try-catch wrapper for the whole class

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const data = await service.login({ username, password });
            return res.status(200).json({ message: 'OK', data });
        } catch (error) {
            return res.status(401).json({ message: 'unauthorized' });
        }
    }

    async register(req, res) {
        try {
            const { username, password, email } = req.body;
            const data = await service.register({ username, password, email });
            return res.status(201).json({ message: 'OK', data });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async refreshToken(req, res) {
        const {
            accesstoken: accessToken,
            refreshtoken: refreshToken,
        } = req.headers;
        const newAccessToken = await service.refreshAccessToken({
            currAccessToken: accessToken,
            currRefreshToken: refreshToken,
        });
        return res.status(200).json({ message: 'OK', data: newAccessToken });
    }
}

module.exports = new AuthController();
