const express = require("express");

const { createProduct, GetAllProduct } = require("../controllers/product");

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", GetAllProduct);


module.exports = productRouter;