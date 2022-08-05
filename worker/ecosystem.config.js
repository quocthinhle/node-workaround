module.exports = {
    apps: [{
        script: 'rabbit-worker.js',
        exec_mode: 'cluster',
        instances: 6,
    }],
};
