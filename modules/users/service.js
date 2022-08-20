const loggers = require('../../helpers/loggers');
const repository = require('./repository');
const { hashPassword } = require('../../helpers/hashing');

class UserService {
    async createUser({ username, rawPassword, email }) {
        const password = await hashPassword(rawPassword);
        await repository.create({ username, password, email });
        loggers.info('Created new user');
    }
}

module.exports = new UserService();
