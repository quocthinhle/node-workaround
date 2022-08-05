const { transporter } = require('../../../configs');
const loggers = require('../../../helpers/loggers');

const emailHandler = async (job, done) => {
    const {
        to,
        text,
        html,
        subject,
    } = job.data;

    const mailOptions = {
        to,
        text,
        subject,
        html,
        from: process.env.EMAIL,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            loggers.error(err);
            return done(err);
        }
        loggers.info(`Send email success ${info}`);
        return done();
    });
};

module.exports = {
    emailHandler,
};
