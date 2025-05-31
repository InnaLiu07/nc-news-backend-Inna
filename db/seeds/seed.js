const format = require("pg-format");
const db = require("../connection");
const { convertTimestampToDate } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => db.query(`DROP TABLE IF EXISTS articles;`))
    .then(() => db.query(`DROP TABLE IF EXISTS users;`))
    .then(() => db.query(`DROP TABLE IF EXISTS topics;`))
    .then(() => {
      return db.query(`
          CREATE TABLE topics (
    slug VARCHAR PRIMARY KEY,
    description VARCHAR NOT NULL,
    img_url VARCHAR(1000)
        );
      `);
    })
    .then(() => {
      return db.query(`CREATE TABLE users(
        username VARCHAR PRIMARY KEY,
        name VARCHAR,
        avatar_url VARCHAR(1000)
        )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        topic VARCHAR REFERENCES topics(slug),
        author VARCHAR REFERENCES users(username),
        body TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000)
        )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments(
       comment_id SERIAL PRIMARY KEY,
article_id INT REFERENCES articles(article_id),
body TEXT NOT NULL,
votes INT DEFAULT 0,
author VARCHAR REFERENCES users(username),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
    })
    .then(() => {
      const formattedTopic = topicData.map(({ slug, description, img_url }) => {
        return [slug, description, img_url];
      });
      const sqlStringForTopics = format(
        `INSERT INTO topics (slug, description, img_url) VALUES %L`,
        formattedTopic
      );
      return db.query(sqlStringForTopics);
    })
    .then(() => {
      const formattedUsers = userData.map(({ username, name, avatar_url }) => {
        return [username, name, avatar_url];
      });
      const sqlStringForUsers = format(
        `INSERT INTO users (username,
        name,
        avatar_url) VALUES %L`,
        formattedUsers
      );
      return db.query(sqlStringForUsers);
    })
    .then(() => {
      const formattedArticles = articleData.map((article) =>
        convertTimestampToDate(article)
      );
      const sqlStringForArticles = format(
        `INSERT INTO articles (title, author, topic, body, created_at, votes, article_img_url) VALUES %L`,
        formattedArticles.map((article) => [
          article.title,
          article.author,
          article.topic,
          article.body,
          article.created_at,
          article.votes,
          article.article_img_url,
        ])
      );
      return db.query(sqlStringForArticles);
    })
    .then(() => {
      const formattedComments = commentData.map((comment) =>
        convertTimestampToDate(comment)
      );

      const sqlStringForComments = format(
        `INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L`,
        formattedComments.map((comment) => [
          comment.article_id,
          comment.body,
          comment.votes,
          comment.author,
          comment.created_at,
        ])
      );

      return db.query(sqlStringForComments);
    });
};
module.exports = seed;
