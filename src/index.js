require('dotenv').config();
const loadModel = require('./configs/database/models');
const logger = require('./helpers/loggers');
const { connectRedis, setupRabbit, connectDatabase } = require('./configs');
const { runPubSub } = require('./pubsub');
const app = require('./http-server');

const PORT = process.env.PORT || 3001;

const main = async () => {
    loadModel();
    await Promise.all([
        connectDatabase(),
        connectRedis(),
        setupRabbit(),
    ]);
    await runPubSub();
    app.listen(PORT, () => logger.info(`Server is listening on ${PORT}`));
};

main().catch((err) => {
    logger.error('Cannot bootstrap application:', err);
    process.exit(1);
});
