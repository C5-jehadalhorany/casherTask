const connection = require("../models/db");

const createHistory = (req, res) => {
    const { solded, total } = req.body;
    const query = `INSERT INTO products (solded,total) VALUE(?,?);`
    const data = [solded, total];
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
            massage: "Success history created",
            result: result,
        });
    });
}


const GetAllHistory = (req, res) => {
    const query = `SELECTE * from products;`;
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                massage: "server error*",
                err: err,
            });
        }
        return res.status(201).json({
            success: true,
            massage: "Success ALL history",
            result: result,
        });
    })
}


module.exports = {
    createHistory,
    GetAllHistory
};