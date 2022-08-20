const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post('/cpu-intensive-task', [], controller.handleCpuIntensiveTask);

module.exports = router;

// asdas
// adas
