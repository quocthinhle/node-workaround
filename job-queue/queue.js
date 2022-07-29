const Queue = require('bull');
const logger = require('../helpers/loggers');

class JobQueue {
    constructor({ name, concurrency }) {
        this.name = name;
        this.concurrency = concurrency;
        this.queue = new Queue(this.name,  process.env.REDIS_HOST);
        this.initEvent();
    }

    provide(data, options = {}) {
        return this.queue.add(data, {
            backoff: {
                type: 'exponential',
                delay: 1000,
            },
            removeOnComplete: true,
            ...options,
        });
    }

    addConsumer(handler) {
        return this.queue.process(this.name, this.concurrency, handler);                                                                                   
    }

    initEvent() {
        this.queue
        .on('completed', (job, _) => {
            logger.info(`INFO: ${this.name.toUpperCase()}: ${job.id} sent successfully`);
        })
        .on('error', (error) => {
            error.message = `ERROR: ${this.name.toUpperCase()}: ${error.message}`;
            logger.error(error);
        })
        .on('stalled', function (job) {
            const error = new Error(`ERROR STALLED JOB IVR: ${this.name.toUpperCase         ()}`);
            logger.error(error);
        })
        .on('lock-extension-failed', function (job, err) {
            error.message = `ERROR REDIS JOB IVR: ${this.name.toUpperCase()}: ${err.message}`;
            logger.error(error);
        });
    }
}

module.exports = {
    JobQueue,
}