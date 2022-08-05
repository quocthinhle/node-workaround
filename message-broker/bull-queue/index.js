const { createBullBoard } = require('bull-board');
const { BullAdapter } = require('bull-board/bullAdapter');
const { JobQueue } = require('./bull-queue');
const { emailHandler } = require('./consumer/email-processing');
const { errorJob } = require('./consumer/error-job');

const emailSenderQueue = new JobQueue('mail-queue', 2);
const errorJobQueue = new JobQueue('error-queue', 1);

const { router } = createBullBoard([
    new BullAdapter(emailSenderQueue.getQueue()),
    new BullAdapter(errorJobQueue.getQueue()),
]);

const setupBullConsumer = async () => {
    await Promise.all([
        emailSenderQueue.addConsumer(emailHandler),
        errorJobQueue.addConsumer(errorJob),
    ]);
};

module.exports = {
    setupBullConsumer,
    emailSenderQueue,
    errorJobQueue,
    adminQueueRouter: router,
};
