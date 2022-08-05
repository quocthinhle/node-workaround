const { RabbitMessageQueue } = require('./rabbit-queue');

const emailRabbitQueue = new RabbitMessageQueue('basic-routing');

const setupRabbitQueue = async (connection) => {
    await emailRabbitQueue.init(connection);
};

const setUpRabbitMQConsumer = async () => {
    await Promise.all([
        emailRabbitQueue.registerConsumer('mail-queue', async (data) => {
            console.log(data);
        }),
    ]);
};

module.exports = {
    setupRabbitQueue,
    setUpRabbitMQConsumer,
    emailRabbitQueue,
};
