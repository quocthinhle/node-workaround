const { Notification } = require('./event-handlers/console-log');
const PubSub = require('./pub-sub');

module.exports = {
    runPubSub: () => {
        PubSub.registerSubscriber(Notification.event, Notification.handler);
        return Promise.all(PubSub.executePubsub());
    }
}