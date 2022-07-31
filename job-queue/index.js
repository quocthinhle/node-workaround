const { createBullBoard } = require('bull-board');
const { BullAdapter } = require('bull-board/bullAdapter');
const { JobQueue } = require('./queue');
const { emailHandler } = require('./consumer/email-processing');

const emailSenderQueue = new JobQueue('mail-queue', 2);

const { router } = createBullBoard([
    new BullAdapter(emailSenderQueue.getQueue()),
]);

const setupWorker = async () => {
    await emailSenderQueue.addConsumer(emailHandler);
};

module.exports = {
    setupWorker,
    emailSenderQueue,
    adminQueueRouter: router,
};
