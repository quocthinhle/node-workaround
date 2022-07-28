require('dotenv').config();
const logger = require('./helpers/loggers');
const { runPubSub } = require('./pubsub');
const { connectRedis } = require('./configs/redis');

const PORT = process.env.PORT || 3000;

const main = async () => {
    await connectRedis();
    await runPubSub();
    const app = require('./http-server');
    app.listen(PORT, () => logger.info(`Server is listening on ${PORT}`));
}

main().catch((err) => {
    logger.error('Cannot bootstrap application:', err);
    process.exit(1); // Learn more about exit code: https://nodejs.org/api/process.html#process_exit_codes
});