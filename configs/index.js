const { transporter } = require('./email/email-transport');
const { getRedisClient, connectRedis } = require('./redis-config');
const { connectRabbitMQ, setupRabbit } = require('./rabbit-mq');
const { connectDatabase } = require('./database');

module.exports = {
    transporter,
    getRedisClient,
    connectRedis,
    connectRabbitMQ,
    setupRabbit,
    connectDatabase,
};
