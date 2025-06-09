const endpointsJson = require("../endpoints.json");
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

describe("GET /api/articles/:article_id", () => {
  test("GET - 200: responds with the article object of the correct id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const {
          article_id,
          title,
          author,
          topic,
          created_at,
          votes,
          article_img_url,
        } = body.article;
        expect(article_id).toBe(1), expect(typeof title).toBe("string");
        expect(typeof author).toBe("string");
        expect(typeof topic).toBe("string");
        expect(typeof created_at).toBe("string");
        expect(typeof votes).toBe("number");
        expect(typeof article_img_url).toBe("string");
      });
  });
  test("GET - 400: responds with an error if id is not valid", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid article_id");
      });
  });
});
