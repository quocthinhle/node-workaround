const { SchemaTypes } = require('mongoose');

const BaseModel = require('../../commons/base/model');

const UserToken = new BaseModel({
    name: 'UserToken',
    options: {
        collection: 'user-tokens',
        timestamps: true,
    },
    schema: {
        userId: {
            type: SchemaTypes.ObjectId,
            required: true,
        },
        refreshToken: {
            type: String,
            required: true,
        },
        expired: {
            type: Boolean,
            default: false,
        },
    },
});

module.exports = UserToken;
