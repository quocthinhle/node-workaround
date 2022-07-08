const { createClient } = require('redis');

module.exports = {
    getRedisConnection: () => {
        return createClient({
            url: process.env.REDIS_HOST,
            username: process.env.REDIS_USER,
            password: process.env.REDIS_PASS,
        });
    }
}