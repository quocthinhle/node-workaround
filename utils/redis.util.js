const { getRedisClient } = require('../configs/redis');
const { publisher: client } = getRedisClient();

const redisOperation = (promise) => {
    return promise.then(data => [undefined, data])
        .catch((err) => [err, undefined]);
}

const getFromRedis = (key) => redisOperation(client.get(key));
const setToRedis = (key, value) => redisOperation(client.set(key, JSON.stringify(value)));
const hmSetToRedis = (id, data) => redisOperation(client.hSet(id, data));
const hmGetRedis = (id) => redisOperation(client.hGetAll(id));

module.exports = {
    client,
    getFromRedis,
    setToRedis,
    hmSetToRedis,
    hmGetRedis,
};
