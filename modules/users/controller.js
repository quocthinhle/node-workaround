const service = require('./service');

class UserController {
    async createUser(req, res, next) {
        const {
            username,
            email,
            password: rawPassword,
        } = req.body;

        await service.createUser({ username, email, rawPassword });
        return res.status(201).json({ message: 'OK' });
    }
}

module.exports = new UserController();