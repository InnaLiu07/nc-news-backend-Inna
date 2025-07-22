const express = require("express");
const apiRouter = express.Router();
const {
  getTopics,
  getArticles,
  getUsers,
  getArticlesById,
  getCommentsByArticlesId,
  patchArticleVotes,
} = require("../controllers/api.controller");
const {
  deleteComment,
} = require("../controllers/deleteCommentById.controller.js");

apiRouter.get("/topics", getTopics);
apiRouter.get("/articles", getArticles);
apiRouter.get("/users", getUsers);
apiRouter.get("/articles/:article_id", getArticlesById);
apiRouter.get("/articles/:article_id/comments", getCommentsByArticlesId);
apiRouter.patch("/articles/:article_id", patchArticleVotes);
apiRouter.delete("/comments/:comment_id", deleteComment);

module.exports = apiRouter;
