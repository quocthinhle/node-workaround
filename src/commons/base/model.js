const { Schema, model } = require('mongoose');

const { ActiveStatus } = require('../constants'); 

class BaseModel {
    constructor({ name, schema, options }) {
        this.name = name;
        this.schema = {
            ...schema,
            isActive: {
                type: String,
                enum: Object.values(ActiveStatus),
                default: ActiveStatus.Active,
            },
        };
        this.options = options;

        this.initModel();
    }

    initModel() {
        const schema = new Schema(this.schema, this.options);
        return model(this.name, schema);
    }
};

module.exports = BaseModel;
