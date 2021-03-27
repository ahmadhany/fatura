const paginate = require('../core/paginate');
const db = require("../models");
const Product = db.products;

exports.findAll = (req, res) => {
    res.send(res.paginatedResult)
};

exports.update = (req, res) => {
    const id = req.params.id;

    Product.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Prodcut with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};

exports.findByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    var condition = categoryId ? {
        categoryId: Number(categoryId)
    } : null;

    const paginatedData = await paginate(Product, req.query, {
        where: condition,
        attributes: ["id", "name", "imageURI", "featured"],
        order: ['id']
    });
    
    const providers = await Promise.all(paginatedData.data.map(v => db.providerProducts.findAll({
        where: {productId: v.id},
        limit: 1,
        attributes: ["price", "available", "providerId"],
        order: [
            [db.Sequelize.literal(`"provider_products"."price"`), 'ASC']
        ]
    })))
    
    const result = paginatedData.data.map((v,i) => {
        return {
            ...v.dataValues,
            provider: {
                id: providers[i][0].dataValues.providerId,
                productDetails:{
                    ...providers[i][0].dataValues
                }
            }
        }
    })

    paginatedData.data = result

    res.send(paginatedData)
};