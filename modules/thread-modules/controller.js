const { controllerMethodTheHardWay } = require('../../commons/base/controller');

class Controller {
    handleCpuIntensiveTask(req, res, next) {
        return controllerMethodTheHardWay(req, res, next)(async () => {
            console.log('this', this.anotherFunction()); // Arrow function so it'll get lexical scope this
            return res.status(200).json({ message: 'OK' });
        });
    }

    anotherFunction() {
        return ('HEHE');
    }
}

module.exports = new Controller();
