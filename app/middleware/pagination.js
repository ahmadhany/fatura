const paginate = require('../core/paginate.js')

module.exports = (model, config = {}) => {
    return async (req, res, next) => {
        try {
            const result = await paginate(model, req.query, config)
            res.paginatedResult = result
            next();
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    };
}