const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */
const seed = require("../db/seeds/seed"); // db seeding function
const db = require("../db/connection"); // db connection
const supertest = require("supertest"); // supertest suite
const data = require("../db/data/test-data/index"); // test seed data
const app = require("../app");

/* Set up your beforeEach & afterAll functions here */

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return supertest(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an array of objects, with slug and description properties", () => {
    return supertest(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const result = response.body.topics;
        expect(result.length).toBe(3);
        result.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
      });
  });
});

describe("GET /api/articles:article_id", () => {
  test("200: Responds with an article object", () => {
    return supertest(app)
      .get("/api/articles/3")
      .expect(200)
      .then((response) => {
        const article = response.body.article;
        // console.log("test repsonse:", response.body);
        expect(typeof article).toBe("object");
        expect(article.author).toBe("icellusedkars");
        expect(article.title).toBe("Eight pug gifs that remind me of mitch");
        expect(article.article_id).toBe(3);
        expect(article.body).toBe("some gifs");
        expect(article.topic).toBe("mitch");
        expect(article).toHaveProperty("created_at");
        expect(article.votes).toBe(0);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("404: Responds with error when no records are found", () => {
    return supertest(app)
      .get("/api/articles/8888")
      .expect(404)
      .then((response) => {
        const error = response.body;
        expect(error.message).toBe("No record found");
        expect(error.status).toBe(404);
      });
  });
});
