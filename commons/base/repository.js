const mongoose = require('mongoose');

const { ActiveStatus } = require('../constants');

const findOperationBaseOptions = {
    isLean: true,
    populate: [],
    fields: '',
    sort: '',
    isActive: ActiveStatus.Active,
};

class BaseRepository {
    constructor(modelName) {
        this.model = mongoose.model(modelName);
    }

    create(data) {
        if (Array.isArray(data)) {
            return this.model.insertMany(data);
        }
        return this.model.create(data);
    }

    findOne(options) {
        const optimizedOptions = Object.assign(findOperationBaseOptions, options);
        return this.model.findOne({ ...optimizedOptions, isActive: ActiveStatus.Active })
            .sort(optimizedOptions.sort)
            .populate(optimizedOptions.populate)
            .select(optimizedOptions.fields)
            .lean(optimizedOptions.lean);
    }

    find() {

    }

    updateOne(options) {
        const optimizedOptions = {
            where: {
                isActive: ActiveStatus.Active,
                ...options.where,
            },
            data: options.data,
            options: {
                new: true,
                ...options.options,
            },
        };
        return this.model
            .updateOne(optimizedOptions.where, optimizedOptions.data, optimizedOptions.options);
    }

    updateMany(options) {
        const optimizedOptions = {
            where: {
                isActive: ActiveStatus.Active,
                ...options.where,
            },
            data: options.data,
            options: {
                new: true,
                ...options.options,
            },
        };
        return this.model
            .updateMany(optimizedOptions.where, optimizedOptions.data, optimizedOptions.options);
    }

    deleteOne(data) {
        return this.model.updateOne(data.where, {
            isActive: ActiveStatus.Inactive,
        });
    }
}

module.exports = BaseRepository;
