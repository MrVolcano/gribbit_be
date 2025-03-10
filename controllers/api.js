const endpoints = require("../endpoints.json");
const { selectAllTopics } = require("../models/topics");
const { selectArticleByID } = require("../models/articles");
const { handleNotFoundError } = require("./errorhandlers");
const { logRequestDetails } = require("../db/seeds/utils");

function getApis(request, response) {
  logRequestDetails(request);
  response.status(200).send({ endpoints: endpoints });
}

function getTopics(request, response) {
  logRequestDetails(request);
  selectAllTopics().then(({ rows }) => {
    response.status(200).send({ topics: rows });
  });
}

function getArticleByID(request, response) {
  logRequestDetails(request);
  const { article_id } = request.params; // extract the article_id from the url
  selectArticleByID(article_id).then(({ rows }) => {
    // handle error if no results are returned by the query
    if (rows.length === 0) {
      return handleNotFoundError(response, "No record found");
    }
    // otherwise return results
    response.status(200).send({ article: rows[0] });
  });
}

module.exports = { getApis, getTopics, getArticleByID };
