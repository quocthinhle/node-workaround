const logger = require('../helpers/loggers');
const { Notification } = require('./event-handlers/console-log');
const pubsub = require('./pub-sub');

module.exports = {
    runPubSub: async () => {
        try {
            await pubsub.init();
            pubsub.registerSubscriber(Notification.event, Notification.handler);
            await Promise.all(pubsub.executePubsub());
            logger.info(`Connected to redis at host: ${process.env.REDIS_HOST}`);
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }
}