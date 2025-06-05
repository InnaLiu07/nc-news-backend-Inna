const endpoints = require("../endpoints.json");
const { selectAllTopics } = require("../models/topics.models.js");

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
module.exports = { getApiEndpoints, getTopics };
