const { transporter } = require('./email/email-transport');
const { getRedisClient, connectRedis } = require('./redis-config');
const { connectRabbitMQ, setupRabbit } = require('./rabbit-mq');

module.exports = {
    transporter,
    getRedisClient,
    connectRedis,
    connectRabbitMQ,
    setupRabbit,
};
