const { Router } = require('express');
const { controller } = require('./controller');

const router = Router();

router.get('/health-check', [], controller.healthCheck);
router.post('/test-redis', [], controller.testNewErrorHandlingStyle);
router.post('/send-email', [], controller.sendEmailDirectly);
router.post('/queue-email', [], controller.addJobSendEmail);

module.exports = router;
