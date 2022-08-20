const path = require('path');
const logger = require('../helpers/loggers');
const { setupRabbit } = require('../configs');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const main = async () => {
    await setupRabbit();
};

main().catch((err) => {
    logger.error('Cannot bootstrap application:', err);
    process.exit(1);
});
