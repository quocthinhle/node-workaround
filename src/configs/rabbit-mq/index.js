/* eslint-disable quotes */
const amqplib = require('amqplib');
const loggers = require('../../helpers/loggers');
const { Queues, Exchanges } = require('./queue-config');
const { setupRabbitQueue, setUpRabbitMQConsumer } = require('../../message-broker/rabbit-queue/setup');

let rabbitConnection;

const getRabbitConnection = () => rabbitConnection;

const setUpRabbit = async () => {
    const channel = await rabbitConnection.createChannel();
    // Create exchanges
    await Promise.all(Exchanges.map((exchange) => {
        const { name, routeType } = exchange;
        return channel.assertExchange(name, routeType);
    }));
    // Create queues
    await Promise.all(Queues.map((queue) => {
        const { name, exchange, routingKey } = queue;
        return channel.assertQueue(name, { durable: true })
            .then(() => channel.bindQueue(name, exchange, routingKey));
    }));
};

const run = async (mode = 'worker') => {
    // eslint-disable-next-line no-use-before-define
    await connectRabbitMQ();
    await setUpRabbit();
    await setupRabbitQueue(rabbitConnection);
    if (mode === 'worker') {
        await setUpRabbitMQConsumer();
    }
};

async function connectRabbitMQ() {
    try {
        rabbitConnection = await amqplib.connect(process.env.RABBIT_URL);
        rabbitConnection.on('error', (err) => {
            loggers.error(`Error Rabbit connection, ${err.message}`);
        });
        rabbitConnection.on('close', (err) => {
            loggers.error(`Close Rabbit connection, ${err.message}`);
            setImmediate(run);
        });
        loggers.info('Connect rabbitMQ successfully');
    } catch (error) {
        loggers.error(error);
        throw error;
    }
}

module.exports = {
    connectRabbitMQ,
    setupRabbit: run,
    getRabbitConnection,
};
