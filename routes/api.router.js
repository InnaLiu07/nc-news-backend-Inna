const express = require("express");
const apiRouter = express.Router();
const { getTopics } = require("../controllers/api.controller");

apiRouter.get("/topics", getTopics);

module.exports = apiRouter;
