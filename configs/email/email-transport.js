const { createTransport } = require('nodemailer');

const transporter = createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

module.exports = {
    transporter,
};
