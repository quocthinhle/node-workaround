const logger = require('../helpers/loggers');
const Events = require('./event-handlers');
const pubsub = require('./pub-sub');

module.exports = {
    runPubSub: async () => {
        try {
            await pubsub.init();

            Object.values(Events).forEach(event => {
                pubsub.registerSubscriber(event);
            });

            await Promise.all(pubsub.executePubsub());
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }
}