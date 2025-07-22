const db = require("../db/connection.js");

const selectAllTopics = () => {
  return db
    .query("SELECT * FROM topics;")
    .then((selectTopics) => selectTopics.rows);
};

const selectAllArticles = (sort_by = "created_at", order = "desc") => {
  const validSortBy = [
    "article_id",
    "title",
    "author",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];
  const validOrder = ["asc", "desc"];

  if (!validSortBy.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by query" });
  }

  if (!validOrder.includes(order.toLowerCase())) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  const queryStr = `
    SELECT 
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
    ORDER BY ${sort_by} ${order.toUpperCase()};
  `;

  return db.query(queryStr).then((results) => results.rows);
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
    SELECT article_id, title, author, topic, created_at, votes, article_img_url, body
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
const selectCommentsByArticlesId = (article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Invalid article_id" });
  }

  const commentsByArticleId = `
SELECT comments.comment_id,
comments.votes,
comments.created_at,
comments.author,
comments.body,
comments.article_id
FROM comments
WHERE comments.article_id = $1
ORDER BY comments.created_at DESC`;
  return db.query(commentsByArticleId, [article_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "comments for this article not found",
      });
    }

    return rows;
  });
};
const updateArticleVotes = (article_id, inc_votes) => {
  if (typeof inc_votes !== "number") {
    return Promise.reject({ status: 400, msg: "Invalid vote increment" });
  }
  return db
    .query(
      `
      UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *;
    `,
      [inc_votes, article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return result.rows[0];
    });
};

module.exports = {
  selectAllTopics,
  selectAllArticles,
  selectAllUsers,
  selectAllArticlesById,
  selectCommentsByArticlesId,
  updateArticleVotes,
};
