const { getRedisClient } = require('../../configs/redis-config');
const { REDIS_KEY } = require('../../commons/constants');
const logger = require('../../helpers/loggers');

module.exports = {
    SetEx: {
        event: REDIS_KEY.EVENT.SETEX,
        handler: async (message) => {
            try {
                const { publisher: client } = await getRedisClient();
                const { key, value } = message;
                client.set(key, JSON.stringify(value)).catch((err) => {
                    logger.error(`Error handling ${REDIS_KEY.EVENT.SETEX}: ${(err && err.message) || err}`);
                });
            } catch (error) {
                logger.error(`Error handler: ${(err && err.message) || err}`)
            }
        },
    },
}