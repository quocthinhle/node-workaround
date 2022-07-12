const logger = require('../../helpers/loggers');
const { Router } = require('express');

const handleFunc = async (req, res) => {
    logger.info('Receive ok');
    return res.send('OK');
}

const router = Router();

router.get('/api/test', handleFunc);

module.exports = router;