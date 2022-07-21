const { REDIS_KEY } = require('../../commons/constants');

module.exports = {
    Notification: {
        event: REDIS_KEY.EVENT.NOTIFICATION,
        handler: (message) => {
            console.log(`Receive new event: ${message}`);
        },
    },
}