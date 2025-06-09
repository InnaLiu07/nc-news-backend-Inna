const express = require("express");
const apiRouter = express.Router();
const { getTopics } = require("../controllers/api.controller");
const { getArticles } = require("../controllers/api.controller");
const { getUsers } = require("../controllers/api.controller");
const { getArticlesById } = require("../controllers/api.controller");
const { getCommentsByArticlesId } = require("../controllers/api.controller");

apiRouter.get("/topics", getTopics);
apiRouter.get("/articles", getArticles);
apiRouter.get("/users", getUsers);
apiRouter.get("/articles/:article_id", getArticlesById);
apiRouter.get("/articles/:article_id/comments", getCommentsByArticlesId);
module.exports = apiRouter;
