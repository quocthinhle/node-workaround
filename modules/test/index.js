const { Router } = require('express');
const logger = require('../../helpers/loggers');
const pubsub = require('../../pubsub/pub-sub');
const { REDIS_KEY } = require('../../commons/constants');
const {
    hmSetToRedis,
    hmGetRedis,
    client,
} = require('../../utils/redis.util');

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

const hmSet = async (req, res) => {
    const { id } = req.body;
    await hmSetToRedis(`object:${id}`, req.body);
    return res.send('OK');
}

const hmGet = async (req, res) => {
    const { id } = req.params;
    const data = await hmGetRedis(`object:${id}`);
    return res.status(200).json(data);
}

const nodeRedisTransactionHandle = async (req, res) => {
    const pipeline = client.multi();
    pipeline.set('p1', 'A');
    pipeline.set('p2', 'B');
    await pipeline.exec();
    return res.send('OK');
}

const router = Router();

router.get('/api/health-check', handleFunc);
router.post('/api/publish-set', handleFunc2);
router.post('/api/publish-race', handleFunc3);
router.post('/api/hm-set', hmSet);
router.get('/api/hm-get/:id', hmGet);
router.get('/api/transaction', nodeRedisTransactionHandle);

module.exports = router;