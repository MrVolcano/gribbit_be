const endpoints = require("../endpoints.json");
const { selectAllTopics } = require("../models/topics");
const { selectArticleByID, selectAllArticles } = require("../models/articles");
const { handleNotFoundError } = require("./errorhandlers");
const { logRequestDetails } = require("../db/seeds/utils");

function getApis(request, response) {
  response.status(200).send({ endpoints: endpoints });
}

function getTopics(request, response) {
  selectAllTopics().then(({ rows }) => {
    response.status(200).send({ topics: rows });
  });
}

function getArticleByID(request, response) {
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

function getAllArticles(request, response) {
  // select all articles
  selectAllArticles().then(({ rows }) => {
    if (rows.length === 0) {
      return handleNotFoundError(response, "No record found");
    }
    response.status(200).send({ articles: rows });
  });
}

module.exports = { getApis, getTopics, getArticleByID, getAllArticles };
