const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});
describe("DELETE /api/comments/:comment_id", () => {
  test("204: deletes the comment and returns no content", () => {
    return request(app)
      .delete("/api/comments/2")
      .expect(204)
      .then(() => {
        return db.query(`SELECT * FROM comments WHERE comment_id = 2;`);
      })
      .then((result) => {
        expect(result.rows.length).toBe(0);
      });
  });

  test("404: returns error if comment does not exist", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Comment not found");
      });
  });

  test("400: returns error for invalid comment_id", () => {
    return request(app)
      .delete("/api/comments/not-a-number")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid comment_id format");
      });
  });
});
describe("GET /api/articles/:article_id/comments", () => {
  test("GET - 200: responds with an array of comments for a valid article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments.length).toBe(11);
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(comment.article_id).toBe(1);
        });
      });
  });
  test("GET - 404 with msg: comments for this article not found, when doesn't have comments", () => {
    return request(app)
      .get("/api/articles/12345/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("comments for this article not found");
      });
  });
});
