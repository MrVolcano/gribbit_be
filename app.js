const express = require("express");
const app = express();
// const endpoints = require("./endpoints.json");
const { getApis, getTopics } = require("./controllers/api");
const { getArticleByID } = require("./controllers/api");

// Task 1: GET /api
// returns all other available endpoints
app.get("/api", getApis);

// Task 2: GET /api/topics
// returns all topics
app.get("/api/topics", getTopics);

// Task 3: GET /api/articles/:id
// returns an article object of given id
app.get("/api/articles/:article_id", getArticleByID);


app.use((error, request, response, next) => {
  console.log("app.js: ", error);
});
module.exports = app;
