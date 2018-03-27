const joi = require('joi')
const appHandler = require('./src/handler');


module.exports = [
    {
        path: '/api/products',
        method: 'GET',
        handler: appHandler.getProducts
    }, 
    {
        path: '/api/products/{id}',
        method: 'GET',
        handler: appHandler.getProduct
    },
    {
        path: '/api/products',
        method: 'POST',
        handler: appHandler.createProduct,
        config: {
            validate: {
                payload: {
                    title: joi.string().required(),
                    category: joi.string().required(),
                    price: joi.number().required(),
                    quantity: joi.number().required(),
                    brand: joi.string().required(),
                    image_url: joi.string().required(),
                }
            }
        }
    },
    {
        path: '/api/products/{id}',
        method: 'PUT',
        handler: appHandler.editProduct,
        config: {
            validate: {
                payload: {
                    title: joi.string().required(),
                    category: joi.string().required(),
                    price: joi.number().required(),
                    quantity: joi.number().required(),
                    brand: joi.string().required(),
                    image_url: joi.string().required(),
                }
            }
        }
    },
    {
        path: '/api/products/{id}',
        method: 'DELETE',
        handler: appHandler.deleteProduct
    }
]