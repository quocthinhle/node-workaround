const { Router } = require('express');
const { controller } = require('./controller');

const router = Router();

router.get('/health-check', [], controller.healthCheck);
router.get('/key-redis', [], controller.getRedis);
router.post('/test-redis', [], controller.testNewErrorHandlingStyle);
router.post('/send-email', [], controller.sendEmailDirectly);
router.post('/queue-email', [], controller.addJobSendEmail);
router.post('/retry-job', [], controller.retryJobOptions);
router.post('/rabbit-ccu', [], controller.testRabbitCCU);
router.post('/publish', [], controller.publish);

module.exports = router;
