
const Boom = require('boom');
const { Pool, Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: 'Pass@123',
    port: 5432,
})

client.connect();


var getProducts = (request, reply) => {
    try {
        client.query('select * from public.product', (err, res) => {
            return reply(res.rows);
        })
    } catch (err) {
        return reply(Boom.badImplementation(err))
    }
}

var getProduct = (request, reply) => {
    try {
        let id = request.params.id;
        client.query(`select title, category, price, quantity, brand, image_url from public.product where id=${id}`, (err, res) => {
            return reply(res.rows);
        })
    } catch (err) {
        return reply(Boom.badImplementation(err))
    }
}

var createProduct = (request, reply) => {
    try {
        let payload = request.payload;
        const text = 'INSERT INTO public.product (title, category, price, quantity, brand, image_url) VALUES($1, $2,$3,$4,$5,$6) RETURNING *'
        const values = [payload.title, payload.category, payload.price, payload.quantity, payload.brand, payload.image_url]
        client.query(text, values, (err, res) => {
            return reply(res.rows);
        })
    } catch (err) {
        return reply(Boom.badImplementation(err))
    }
}

var editProduct = (request, reply) => {
    try {
        let payload = request.payload;
        const text = 'UPDATE public.product SET title=$1, category=$2, price=$3, quantity=$4, brand=$5, image_url=$6 WHERE id=$7 RETURNING *';
        const values = [payload.title, payload.category, payload.price, payload.quantity, payload.brand, payload.image_url, request.params.id];
        client.query(text, values, (err, res) => {
            return reply(res.rows);
        })
    } catch (err) {
        return reply(Boom.badImplementation(err))
    }
}

var deleteProduct = (request, reply) => {
    try {
        const text = 'delete public.product  WHERE id=$1 ';
        const values = [request.params.id];
        client.query(text, values, (err, res) => {
            return reply({ status: 'success' });
        })
    } catch (err) {
        return reply(Boom.badImplementation(err))
    }
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct
}