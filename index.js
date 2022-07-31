require('dotenv').config();
const logger = require('./helpers/loggers');
const { runPubSub } = require('./pubsub');
const { connectRedis } = require('./configs/redis');
const { setupWorker } = require('./job-queue/index');

const PORT = process.env.PORT || 3000;

const main = async () => {
    const mode = process.env.MODE;
    if (mode === 'HTTP-SERVER') {
        await connectRedis();
        await runPubSub();
        // eslint-disable-next-line global-require
        const app = require('./http-server');
        app.listen(PORT, () => logger.info(`Server is listening on ${PORT}`));
    }

    if (mode === 'WORKER') {
        await setupWorker();
    }
};

main().catch((err) => {
    logger.error('Cannot bootstrap application:', err);
    process.exit(1);
});
