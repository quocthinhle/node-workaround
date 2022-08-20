const BaseRepository = require('../../commons/base/repository');

class UserRepository extends BaseRepository {
    constructor() {
        super('User');
    }
};

module.exports = new UserRepository();
