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
const {
  deleteComment,
  handleDeleteComment,
} = require("./controllers/comments");

// add cors to bypass CORS requirements
const cors = require("cors");
app.use(cors());

// add body parsing middleware to handle JSON bodies
app.use(express.json());

// Task 1: GET /api
// responds with all other available endpoints
app.get("/api", getApis);

// Task 2: GET /api/topics
// responds with all topics
app.get("/api/topics", getTopics);

// Task 3: GET /api/articles/:id
// responds with an article object of given id
app.get("/api/articles/:article_id", getArticleByID);

// Task 4: GET /api/articles
// responds with an array of article objects
app.get("/api/articles", getAllArticles);

// Task 5: GET /api/articles/:article_id/comments
// responds with an array of comments for a given article
app.get("/api/articles/:article_id/comments", getCommentsByArticleID);

// Task 6: POST /api/articles/:article_id/comments
// adds a comment to the specified article_id
app.post("/api/articles/:article_id/comments", postComment);

// Task 7: PATCH /api/articles/:article_id
// increase/decrease votes for the specified article
app.patch("/api/articles/:article_id", patchArticle);

// Task 8: DELETE /api/comments/:comment_id
// delete the given comment by comment_id
app.delete("/api/comments/:commentID", handleDeleteComment);

// Error handling middleware
app.use(handleDBErrors); // Handle DB-specific errors first
app.use(handleDefaultErrors); // Handle custom errors (400, 404, etc.)
app.use(handle404); // Catch any unhandled 404s (e.g., invalid routes)

module.exports = app;
