const status = require('http-status');
const logger = require('../../helpers/loggers');
const { controllerMethod } = require('../../commons/base/controller');
const { setToRedis } = require('../../utils/redis.util');
const { emailHandler } = require('../../job-queue/consumer/email-processing');
const { emailSenderQueue } = require('../../job-queue');

class TestController {
    testNewErrorHandlingStyle(req, res, next) {
        controllerMethod(req, res, next)(async () => {
            const { key, value } = req.body;
            const [err, data] = await setToRedis(key, value);
            if (err) {
                return res.response(status[400], err.message);
            }
            return res.response(status.OK, data);
        });
    }

    testRedisPubsub(req, res, next) {
        controllerMethod(req, res, next)(async () => {

        });
    }

    testRedisTransaction(req, res, next) {
        controllerMethod(req, res, next)(async () => {

        });
    }

    testBlockApi(req, res, next) {
        controllerMethod(req, res, next)(async () => {
            const { delay } = req.body;
            const now = Date.now();
            for (;;) {
                if (Date.now() - now > delay) {
                    break;
                }
            }
            return res.response(status.OK, {});
        });
    }

    healthCheck(req, res, next) {
        controllerMethod(req, res, next)(async () => {
            logger.info('Healthcheck !!');
            return res.response(status.OK, {});
        });
    }

    sendEmailDirectly(req, res, next) {
        controllerMethod(req, res, next)(async () => {
            const {
                to,
                text,
                html,
                subject,
            } = req.body;

            emailHandler({
                data: {
                    to,
                    text,
                    html,
                    subject,
                },
            }, (() => res.response(status.OK, {})));
        });
    }

    addJobSendEmail(req, res, next) {
        controllerMethod(req, res, next)(async () => {
            const {
                to,
                text,
                html,
                subject,
            } = req.body;

            await emailSenderQueue.provide({
                to,
                text,
                html,
                subject,
            });

            return res.response(status.OK, {});
        });
    }
}

module.exports = {
    controller: new TestController(),
};
