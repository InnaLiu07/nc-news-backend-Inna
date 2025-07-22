const request = require("supertest");
const app = require("../app");

describe("PATCH /api/articles/:article_id", () => {
  test("200: increments votes and returns updated article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 10 })
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toHaveProperty("votes", 110);
      });
  });

  test("400: responds with bad request when inc_votes is invalid", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "banana" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request: inc_votes must be a number");
      });
  });

  test("404: article not found", () => {
    return request(app)
      .patch("/api/articles/9999")
      .send({ inc_votes: 1 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });

  test("400: invalid article_id type", () => {
    return request(app)
      .patch("/api/articles/notanid")
      .send({ inc_votes: 1 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid article ID");
      });
  });
});
