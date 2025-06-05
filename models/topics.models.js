const db = require("../db/connection.js");

const selectAllTopics = () => {
  return db
    .query("SELECT * FROM topics;")
    .then((selectTopics) => selectTopics.rows);
};

module.exports = { selectAllTopics };
