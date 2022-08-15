// const amqp = require('amqplib');
const loggers = require('../../helpers/loggers');

class RabbitMessageQueue {
    constructor(exchange) {
        this.exchange = exchange;
    }

    /**
     * @param {amqp.Connection} rabbitConnection
     */
    async init(rabbitConnection) {
        this.rabbitConnection = rabbitConnection;
        this.channel = await rabbitConnection.createChannel();
        this.channel.prefetch(10);
    }

    async setPrefetch(prefetch) {
        this.channel.close();
        this.channel = await this.rabbitConnection.createChannel();
        this.channel.prefetch(prefetch);
        await this.registerConsumer('mail-queue', async (data) => {
            console.log('Haha: ', data);
        });
    }

    provide(data, routingKey) {
        const message = JSON.stringify(data, 0, null);
        return this.channel.publish(this.exchange, routingKey, Buffer.from(message), {
            contentType: 'application/json',
            persistent: true,
        });
    }

    registerConsumer(name, handler) {
        return this.channel.consume(name, async (msg) => {
            const { content } = msg;
            try {
                const data = (Buffer.from(content)).toString();
                const sendAck = () => this.channel.ack(msg);
                await handler({ ...data, sendAck });
            } catch (error) {
                loggers.error('Error handler: ', error);
            }
        });
    }
}

module.exports = {
    RabbitMessageQueue,
};
