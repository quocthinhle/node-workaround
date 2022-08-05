const path = require('path');
const logger = require('../helpers/loggers');
const { connectRedis } = require('../configs');
const { setupBullConsumer } = require('../message-broker/bull-queue');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const main = async () => {
    await connectRedis();
    await setupBullConsumer();
};

main().catch((err) => {
    logger.error('Cannot bootstrap application:', err);
    process.exit(1);
});
