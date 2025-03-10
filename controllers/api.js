const endpoints = require("../endpoints.json");
const { selectAllTopics } = require("../models/topics");

function getApis(request, response) {
  console.log("received: GET /api");
  response.status(200).send({ endpoints: endpoints });
}

function getTopics(request, response) {
  console.log("received: GET /api/topics");
  selectAllTopics().then(({ rows }) => {
    response.status(200).send({ topics: rows });
  });
}

module.exports = { getApis, getTopics };
