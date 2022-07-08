const { Router } = require('express');
const { Notification } = require('../pubsub/event-handlers/console-log');
const router = Router();
const pubsub = require('../pubsub/pub-sub');

router.post('/publish', async (req, res, next) => {
    const msg = JSON.stringify(req.body.message) || 'Hello';
    console.log('Receive data: ', msg);
    await pubsub.publish(Notification.event, msg);
    return res.send('OK');
})

module.exports = router;