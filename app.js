const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");

// Task 1: GET /api
// returns all other available endpoints

app.get("/api", (request, response) => {
  console.log("received: /api request");
  response.status(200).send({ endpoints: endpoints });
});

module.exports = app;
