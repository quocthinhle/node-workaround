const { getRedisClient } = require('../configs/redis');

const { publisher: client } = getRedisClient();

const hmSetToRedis = (id, data) => {
    return client.HSET(id, data);
}

const hmGetRedis = (id) => {
    return client.HGETALL(id);
}

module.exports = {
    client,
    hmSetToRedis,
    hmGetRedis,
}