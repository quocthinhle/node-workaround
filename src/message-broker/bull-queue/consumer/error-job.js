/* eslint-disable no-console */
const taskManipulate = () => Promise.reject(new Error('ERROR'));

const errorJob = async (job, done) => {
    try {
        const { content } = job.data;
        console.log(`Task is being consumed ${content}`);
        await taskManipulate();
        console.log('Task done');
        return done();
    } catch (err) {
        console.log('Task fail');
        return done(err);
    }
};

module.exports = {
    errorJob,
};
