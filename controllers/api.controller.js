const { request } = require("../app.js");
const endpoints = require("../endpoints.json");
const { selectAllTopics } = require("../models/topics.models.js");
const { selectAllArticles } = require("../models/topics.models.js");
const { selectAllUsers } = require("../models/topics.models.js");
const { selectAllArticlesById } = require("../models/topics.models.js");
const { selectCommentsByArticlesId } = require("../models/topics.models.js");

getApiEndpoints = (req, res) => {
  res.status(200).send(endpoints);
};

const getTopics = (req, res, next) => {
  selectAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

const getArticles = (req, res, next) => {
  selectAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
const getUsers = (req, res, next) => {
  selectAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};
const getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectAllArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
const getCommentsByArticlesId = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArticlesId(article_id)
    .then((comments) => {
      if (comments.length === 0) {
        res.status(404).send({ msg: "comments for this article not found" });
      } else {
        res.status(200).send({ comments });
      }
    })
    .catch(next);
};

module.exports = {
  getApiEndpoints,
  getTopics,
  getArticles,
  getUsers,
  getArticlesById,
  getCommentsByArticlesId,
};
