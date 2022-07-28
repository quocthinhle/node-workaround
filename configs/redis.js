const { createClient } = require('redis');

const logger = require('../helpers/loggers');

let isExecuted = false;
let publisher;
let subscriber;

const connectRedis = async () => {
    if (isExecuted) {
        return;
    }

    isExecuted = true;

    try {
        publisher = createClient({
            url: process.env.REDIS_HOST,
            username: process.env.REDIS_USER,
            password: process.env.REDIS_PASS,
        });
    
        subscriber = createClient({
            url: process.env.REDIS_HOST,
            username: process.env.REDIS_USER,
            password: process.env.REDIS_PASS,
        });
    
        publisher.on('error', (err) => {
            logger.error('Redis connection error: ', err);
        });
    
        subscriber.on('error', (err) => {
            logger.error('Redis connection error: ', err);
        });
    
        await Promise.all([publisher.connect(), subscriber.connect()]);
        logger.info('Successfully connect Redis');

    } catch (err) {
        logger.error('Redis connections error');
        throw err;
    }
};

const getRedisClient = (getSubscriber = false) => {
    if (getSubscriber) {
        return { publisher, subscriber };
    }
    return { publisher };
}

module.exports = {
    getRedisClient,
    connectRedis,  
}