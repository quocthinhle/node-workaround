const BaseModel = require('../../commons/base/model');

const User = new BaseModel({
    name: 'User',
    options: {
        collection: 'users',
        timestamps: true,
    },
    schema: {
        username: {
            type: String,
            unique: true,
            required: true,
            minLength: 5,
            maxLength: 100,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        email: {
            type: String,
        },
    },
});

module.exports = User;
