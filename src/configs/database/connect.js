const mongoose = require('mongoose');
const logger = require('../../helpers/loggers');

const connectDatabse = async () => {
    const uri = process.env.DB_URI || 'mongodb://localhost:27017/redis-learning';
    return new Promise((resolve, reject) => {
        mongoose.connect(uri)
            .then((data) => {
                logger.info('Connect DB successfully');
                resolve(data);
            })
            .catch((error) => reject(error));
    });
}

module.exports = connectDatabse;