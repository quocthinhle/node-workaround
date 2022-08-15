const status = require('http-status');
const pubsub = require('../../pubsub/pub-sub');
const logger = require('../../helpers/loggers');
const loggers = require('../../helpers/loggers');
const { controllerMethod } = require('../../commons/base/controller');
const { setToRedis, getFromRedis } = require('../../utils/redis.util');
const { emailHandler } = require('../../message-broker/bull-queue/consumer/email-processing');
const { emailSenderQueue, errorJobQueue, emailRabbitQueue } = require('../../message-broker/rabbit-queue/setup');

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

    getRedis(req, res, next) {
        controllerMethod(req, res, next)(async () => {
            const { key } = req.query;
            const [err, data] = await getFromRedis(key);
            if (err) {
                return res.response(status[400], err.message);
            }
            return res.response(status.OK, JSON.parse(data));
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

    healthCheck = async (req, res, next) => {
        controllerMethod(req, res, next)(async () => {
            logger.info('Healthcheck !!');
            return res.response(status.OK, {});
        });
    };

    healthCheck1(req, res, next) {
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

    retryJobOptions(req, res, next) {
        controllerMethod(req, res, next)(async () => {
            const { times, content, delay } = req.body;
            await errorJobQueue.provide({ content }, {
                backoff: delay,
                attempts: times,
            });
            return res.response(status.OK, {
                message: 'Add job success',
            });
        });
    }

    testRabbitCCU(req, res, next) {
        controllerMethod(req, res, next)(async () => {
            const { msg } = req.body;
            await emailRabbitQueue.provide({ msg });
            return res.response(status.OK, {
                message: 'Add job success',
            });
        });
    }

    publish(req, res, next) {
        controllerMethod(req, res, next)(async () => {
            const { msg } = req.body;
            await pubsub.publish('notification', msg).catch((err) => loggers.error(err));
            return res.response(status.OK, {
                message: 'Publish success',
            });
        });
    }

    setPrefetch(req, res, next) {
        controllerMethod(req, res, next)(async () => {
            const { n } = req.body;
            await emailRabbitQueue.setPrefetch(n);
            return res.response(status.OK, {
                message: 'Set prefetch success',
            });
        });
    }
}

module.exports = {
    controller: new TestController(),
    hehe: {
        a: 'x',
        b: 'y',
    },
};
