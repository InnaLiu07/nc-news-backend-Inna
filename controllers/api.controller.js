const endpoints = require("../endpoints.json");
const { selectAllTopics } = require("../models/topics.models.js");
const { selectAllArticles } = require("../models/topics.models.js");
const { selectAllUsers } = require("../models/topics.models.js");

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

module.exports = { getApiEndpoints, getTopics, getArticles, getUsers };
