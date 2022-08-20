const { genSalt, hash, compare } = require('bcrypt');

const logger = require('../loggers');

const hashPassword = async (password) => {
    const salt = await genSalt(Number(process.env.SALT_ROUNDS) || 10);
    return hash(password, salt);
}

const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await compare(password, hashedPassword);
        if (match) {
            return true;
        }
    } catch (error) {
        logger.error(error);
        return false;
    }
}

module.exports = {
    hashPassword,
    comparePassword,
};
