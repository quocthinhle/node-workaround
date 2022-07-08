const { Notification } = require('./event-handlers/console-log');
const pubsub = require('./pub-sub');

module.exports = {
    runPubSub: async () => {
        await pubsub.init();
        pubsub.registerSubscriber(Notification.event, Notification.handler);
        return Promise.all(pubsub.executePubsub());
    }
}