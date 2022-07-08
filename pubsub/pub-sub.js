const { getRedisConnection } = require('../utils/redis-connect');

class PubSub {
    constructor() {
        this.publisher = getRedisConnection();
        this.subscriber = getRedisConnection();
        this.subscriber.connect();
        this.publisher.connect();
        this.eventHandler = {};
    }

    publish(event, data) {
        return new Promise((resolve, reject) => {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }

            this.publisher.publish(event, data, (error) => {
                if (error) {
                    return reject('ERROR_PUBLISHING');
                }
                return resolve();
            });

            return resolve();
        });
    }

    registerSubscriber(event, handler) {
        if (! this.eventHandler[event]) {
            this.eventHandler[event] = [];
        }
        this.eventHandler[event].push(handler);
    }

    executePubsub() {
        return Object.keys(this.eventHandler).map(event => (
            this.subscriber.subscribe(event, (message) => {
                let convertedData;
                try {
                    convertedData = JSON.parse(message);
                } catch (_) {
                    convertedData = message;
                }

                this.eventHandler[event].forEach(handler => {
                    handler(convertedData);
                });
            })
        ));
    }
}

module.exports = new PubSub();