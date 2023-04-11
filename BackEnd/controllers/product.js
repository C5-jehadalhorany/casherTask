const connection = require("../models/db");

const createProduct = (req, res) => {
    const { productName, price } = req.body;
    const query = `INSERT INTO products (productName,price) VALUE(?,?);`
    const data = [productName, price];
    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                massage: "server error*",
                err: err,
            });
        }
        return res.status(201).json({
            success: true,
            massage: "Success product created",
            result: result,
        });
    });
}


const GetAllProduct = (req, res) => {
    const query = `SELECT * from products;`;
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                massage: "server error*",
                err: err,
            });
        }
        return res.status(200).json({
            success: true,
            massage: "Success ALL product",
            result: result,
        });
    })
}


module.exports = {
    createProduct,
    GetAllProduct
};
