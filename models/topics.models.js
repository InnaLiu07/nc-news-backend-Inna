const db = require("../db/connection.js");

const selectAllTopics = () => {
  return db
    .query("SELECT * FROM topics;")
    .then((selectTopics) => selectTopics.rows);
};

const selectAllArticles = () => {
  const articlesStr = `SELECT 
  articles.article_id,
  articles.title,
  articles.author,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url,
  COUNT(comments.comment_id)::INT AS comment_count
FROM articles
LEFT JOIN comments ON comments.article_id = articles.article_id
GROUP BY articles.article_id
ORDER BY articles.created_at DESC`;
  console.log(selectAllArticles);
  return db
    .query(articlesStr)

    .then((results) => results.rows);
};

const selectAllUsers = () => {
  return db
    .query("SELECT * FROM users;")
    .then((selectUsers) => selectUsers.rows);
};

module.exports = { selectAllTopics, selectAllArticles, selectAllUsers };
