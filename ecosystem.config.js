module.exports = {
  apps : [{
    script: 'bin/www',
    instances: "4",
    exec_mode: "cluster"
  }],
};
