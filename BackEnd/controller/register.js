const connection = require("../model/db")
require("../model/db");

const register = (req, res) => {
    const { name, password } = req.body;
    const query = `INSERT INTO register (name, password) VALUES(?,?);`
    const data = [name, password];
    connection.query(query, data, (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(404).json({
                success: false,
                message: "Error in database",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Account Created Successfully",
            result,
        });
    });
};
module.exports = { register };