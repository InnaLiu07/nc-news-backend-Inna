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

const selectAllArticlesById = (article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Invalid article_id" });
  }

  const articlesStrById = `
    SELECT article_id, title, author, topic, created_at, votes, article_img_url
    FROM articles
    WHERE article_id = $1;
  `;

  return db.query(articlesStrById, [article_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Article not found" });
    }
    return rows[0];
  });
};

module.exports = {
  selectAllTopics,
  selectAllArticles,
  selectAllUsers,
  selectAllArticlesById,
};
