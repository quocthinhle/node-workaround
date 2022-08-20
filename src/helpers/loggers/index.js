// TODO: AWS Cloudwatch
const path = require('path');
const winston = require('winston');

const loggerLevel = {
    error: 'error',
    info: 'info',
    warn: 'warn',
};

const loggerConfiguration = {
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            level: loggerLevel.error,
            filename: path.join(process.cwd(), './logs/index.log'),
        }),
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => (
            `${info.level}: ${[info.timestamp]}: ${info.message}`
        )),
    ),
};

module.exports = winston.createLogger(loggerConfiguration);
