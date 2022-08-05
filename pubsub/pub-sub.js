const { getRedisClient } = require('../configs/redis-config');

class PubSub {
    constructor() {
        this.publisher = {};
        this.subscriber = {};
        this.eventHandler = {};
    }

    init() {
        const { publisher, subscriber } = getRedisClient(true);
        this.publisher = publisher;
        this.subscriber = subscriber;
    }

    publish(event, data) {
        return new Promise((resolve, reject) => {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }

            // TODO: Refactor this one
            this.publisher.publish(event, data, (error) => {
                if (error) {
                    reject(new Error('ERROR_PUBLISHING'));
                }
                resolve();
            });

            resolve();
        });
    }

    registerSubscriber(data) {
        const { event, handler } = data;
        if (!this.eventHandler[event]) {
            this.eventHandler[event] = [];
        }
        this.eventHandler[event].push(handler);
    }

    executePubsub() {
        return Object.keys(this.eventHandler).map((event) => (
            this.subscriber.subscribe(event, (message) => {
                let convertedData;
                try {
                    convertedData = JSON.parse(message);
                } catch (_) {
                    convertedData = message;
                }

                this.eventHandler[event].forEach((handler) => {
                    handler(convertedData);
                });
            })
        ));
    }
}

module.exports = new PubSub();
