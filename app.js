const express = require("express");
const app = express();
// const endpoints = require("./endpoints.json");
const {
  getApis,
  getTopics,
  getAllArticles,
  getCommentsByArticleID,
  postComment,
} = require("./controllers/api");
const { getArticleByID } = require("./controllers/api");
const {
  handle404,
  handleErrors,
  handleDatabaseErrors: handleDBErrors,
  handleDefaultErrors,
} = require("./controllers/errorhandlers");

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
app.get("/api/articles/:article_id", getArticleByID);

// Task 4: GET /api/articles
// returns an array of article objects
app.get("/api/articles", getAllArticles);

// Task 5: GET /api/articles/:article_id/comments
// returns an array of comments for a given article
app.get("/api/articles/:article_id/comments", getCommentsByArticleID);

// Task 6: POST /api/articles/:article_id/comments
// adds a comment to the specified article_id
app.post("/api/articles/:article_id/comments", postComment);

// Catch-all for 404 errors
app.use(handle404); // Use the 404 handler

// Error handling middleware
app.use(handleDBErrors);
app.use(handleDefaultErrors);

module.exports = app;
