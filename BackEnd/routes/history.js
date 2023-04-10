const express = require("express");

const { createHistory,
    GetAllHistory } = require("../controllers/history");

const historyRouter = express.Router();

historyRouter.post("/", createHistory);
historyRouter.get("/", GetAllHistory);


module.exports = historyRouter;