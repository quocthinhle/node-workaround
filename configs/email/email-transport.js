const { createTransport } = require('nodemailer');

const transporter = createTransport({
    pool: true,
    maxConnections: 5,
    maxMessages: 200,
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
}, {
    debug: true,
    logger: true,
});

module.exports = {
    transporter,
};
