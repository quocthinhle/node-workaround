require('dotenv').config();
const logger = require('./helpers/loggers');
const app = require('./http-server');
const { runPubSub } = require('./pubsub');

const PORT = process.env.PORT || 3000;

const main = async () => {
    await runPubSub();
    app.listen(PORT, () => logger.info(`Server is listening on ${PORT}`));
}

main().catch((err) => {
    logger.error('Cannot bootstrap application:', err);
    process.exit(1); // Learn more about exit code: https://nodejs.org/api/process.html#process_exit_codes
});