const { Router } = require('express');
const logger = require('../../helpers/loggers');
const pubsub = require('../../pubsub/pub-sub');
const { REDIS_KEY } = require('../../commons/constants');

const handleFunc = async (req, res) => {
    logger.info('Receive ok');
    return res.send('OK');
}

const handleFunc2 = async (req, res) => {
    const { key, value } = req.body;
    pubsub.publish(REDIS_KEY.EVENT.SETEX, { key, value });
    return res.send('OK');
}

const handleFunc3 = async (req, res) => {
    const { key, value } = req.body;
    return res.send('OK1');
}

const router = Router();

router.get('/api/health-check', handleFunc);
router.post('/api/publish-set', handleFunc2);
router.post('/api/publish-race', handleFunc3);

module.exports = router;