const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const roleRouter = require("./routes/roles");
const productRouter = require("./routes/roles");

const permissionRouter = require("./routes/permission");


const app = express();
app.use(express.json());
app.use(cors());

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/role", roleRouter);
app.use("/permission", permissionRouter);
app.use("/product", productRouter);



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is ruining on port ${ PORT }`);
});