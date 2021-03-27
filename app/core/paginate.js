const utils = require('../utils');

module.exports = async (model, query, config={}) => {
    const page = utils.isNumber(query.page) ? parseInt(query.page) : (query.page = 1);
    const limit = utils.isNumber(query.limit) ? parseInt(query.limit) : (query.limit = 25);
    const startIndex = (page - 1) * limit;

    const result = {};

    const sqlResult = await model.findAndCountAll({
        ...config,
        limit: limit,
        offset: startIndex
    }).then(data => data);

    result.totalItems = sqlResult.count
    result.data = sqlResult.rows

    return result;
};