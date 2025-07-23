const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/articles?topic=mitch", () => {
  test("200: returns only articles with topic 'mitch'", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles.length).toBeGreaterThan(0);
        body.articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });

  test("404: returns error when topic does not exist", () => {
    return request(app)
      .get("/api/articles?topic=nonexistent")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Topic not found");
      });
  });
});

describe("GET /api/articles (with queries)", () => {
  test("200: sorts by 'title' ascending", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=asc")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(Array.isArray(articles)).toBe(true);
        const isSorted = articles.every((a, i, arr) => {
          return i === 0 || a.title >= arr[i - 1].title;
        });
        expect(isSorted).toBe(true);
      });
  });

  test("200: sorts by 'votes' descending (default order)", () => {
    return request(app)
      .get("/api/articles?sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(Array.isArray(articles)).toBe(true);
        const isSorted = articles.every((a, i, arr) => {
          return i === 0 || a.votes <= arr[i - 1].votes;
        });
        expect(isSorted).toBe(true);
      });
  });

  test("200: uses default sort_by=created_at and order=desc", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(Array.isArray(articles)).toBe(true);
        const isSorted = articles.every((a, i, arr) => {
          return (
            i === 0 || new Date(a.created_at) <= new Date(arr[i - 1].created_at)
          );
        });
        expect(isSorted).toBe(true);
      });
  });

  test("400: invalid sort_by column", () => {
    return request(app)
      .get("/api/articles?sort_by=not_a_column")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid sort_by query");
      });
  });

  test("400: invalid order value", () => {
    return request(app)
      .get("/api/articles?order=sideways")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid order query");
      });
  });
});

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
