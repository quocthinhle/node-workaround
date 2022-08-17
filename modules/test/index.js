const { Router } = require('express');
const { controller } = require('./controller');

const router = Router();

const checkInfo = (req, res, next) => {
    const a = {
        test() {
            console.log(this);
        },
    };

    console.log(a.test());

    console.log(controller);
    console.log(typeof controller);
    return next();
};

router.get('/health-check1', [checkInfo], controller.healthCheck1);
router.get('/health-check', [checkInfo], controller.healthCheck);
router.get('/key-redis', [], controller.getRedis);
router.post('/test-redis', [], controller.testNewErrorHandlingStyle);
router.post('/send-email', [], controller.sendEmailDirectly);
router.post('/queue-email', [], controller.addJobSendEmail);
router.post('/retry-job', [], controller.retryJobOptions);
router.post('/rabbit-ccu', [], controller.testRabbitCCU);
router.post('/publish', [], controller.publish);
router.post('/set-prefetch', [], controller.setPrefetch);
router.post('/email', [], controller.testEmail.bind(controller));

module.exports = router;

// FifaOnl4