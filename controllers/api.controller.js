const endpoints = require("../endpoints.json");
const { selectAllTopics } = require("../models/topics.models.js");
const { selectAllArticles } = require("../models/topics.models.js");

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
module.exports = { getApiEndpoints, getTopics, getArticles };
