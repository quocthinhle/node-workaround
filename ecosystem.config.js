module.exports = {
    apps: [{
        script: 'index.js',
        exec_mode: 'cluster',
        instances: 4,
    }],
};
