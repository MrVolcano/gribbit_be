const express = require("express");
const app = express();
const {
  getApis,
  getTopics,
  getAllArticles,
  getCommentsByArticleID,
  postComment,
  patchArticle,
} = require("./controllers/api");
const { getArticleByID } = require("./controllers/api");
const {
  handle404,
  handleDBErrors,
  handleDefaultErrors,
} = require("./controllers/errorhandlers");
const { checkArticleIdMiddleware } = require("./controllers/middleware");

// add body parsing middleware to handle JSON bodies
app.use(express.json());

// Task 1: GET /api
// returns all other available endpoints
app.get("/api", getApis);

// Task 2: GET /api/topics
// returns all topics
app.get("/api/topics", getTopics);

// Task 3: GET /api/articles/:id
// returns an article object of given id
app.get("/api/articles/:article_id", checkArticleIdMiddleware, getArticleByID);

// Task 4: GET /api/articles
// returns an array of article objects
app.get("/api/articles", getAllArticles);

// Task 5: GET /api/articles/:article_id/comments
// returns an array of comments for a given article
app.get(
  "/api/articles/:article_id/comments",
  checkArticleIdMiddleware,
  getCommentsByArticleID
);

// Task 6: POST /api/articles/:article_id/comments
// adds a comment to the specified article_id
app.post(
  "/api/articles/:article_id/comments",
  checkArticleIdMiddleware,
  postComment
);

// Task 7: PATCH /api/articles/:article_id
// increase/decrease votes for the specified article
app.patch("/api/articles/:article_id", checkArticleIdMiddleware, patchArticle);

// Error handling middleware
app.use(handleDBErrors); // Handle DB-specific errors first
app.use(handleDefaultErrors); // Handle custom errors (400, 404, etc.)
app.use(handle404); // Catch any unhandled 404s (e.g., invalid routes)

module.exports = app;
