require('dotenv').config();
const logger = require('./helpers/loggers');
const { connectRedis, setupRabbit } = require('./configs');
const { runPubSub } = require('./pubsub');
const app = require('./http-server');

const PORT = process.env.PORT || 3000;

const main = async () => {
    await setupRabbit('http-server');
    await connectRedis();
    await runPubSub();
    app.listen(PORT, () => logger.info(`Server is listening on ${PORT}`));
};

main().catch((err) => {
    logger.error('Cannot bootstrap application:', err);
    process.exit(1);
});
