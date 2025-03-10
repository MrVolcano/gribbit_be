const express = require("express");
const app = express();
// const endpoints = require("./endpoints.json");
const { getApis, getTopics } = require("./controllers/api");

// Task 1: GET /api
// returns all other available endpoints

app.get("/api", getApis);

app.get("/api/topics", getTopics);

module.exports = app;
