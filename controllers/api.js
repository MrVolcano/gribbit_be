const endpoints = require("../endpoints.json");
const { selectAllTopics } = require("../models/topics");
const {
  selectArticleByID,
  selectAllArticles,
  selectCommentsByArticleID,
  insertComment,
} = require("../models/articles");
const { handle404 } = require("./errorhandlers");
const { response } = require("../app");

function getApis(request, response) {
  response.status(200).send({ endpoints: endpoints });
}

function getTopics(request, response) {
  selectAllTopics().then(({ rows }) => {
    response.status(200).send({ topics: rows });
  });
}

function getArticleByID(request, response, next) {
  const { article_id } = request.params; // extract the article_id from the url
  selectArticleByID(article_id).then(({ rows }) => {
    // handle error if no results are returned by the query
    if (rows.length === 0) {
      // return handleNotFoundError(response, "No record found");
      return handle404(request, response, next);
    }
    // otherwise return results
    response.status(200).send({ article: rows[0] });
  });
}

function getAllArticles(request, response, next) {
  // select all articles
  selectAllArticles().then(({ rows }) => {
    if (rows.length === 0) {
      // return handleNotFoundError(response, "No record found");
      return handle404(request, response, next);
    }
    response.status(200).send({ articles: rows });
  });
}

function getCommentsByArticleID(request, response, next) {
  const { article_id } = request.params;

  // input validation
  if (isNaN(article_id)) {
    const error = new Error("Invalid article ID: It must be an integer");
    error.status = 400;
    return next(error);
  }

  selectCommentsByArticleID(article_id)
    .then(({ comments }) => {
      if (comments.length === 0) {
        return handle404(request, response, next);
      }
      response.status(200).send({ comments });
    })
    .catch((error) => {
      next(error);
    });
}

function postComment(request, response) {
  // validate article_id
  // validate user_id
  const { article_id } = request.params;
  const { username, body } = request.body;
  console.log("username: ", username);
  console.log("comment: ", body);
  console.log("postComment article_id:", article_id);
  insertComment(article_id, username, body).then((dbResponse) => {
    console.log("db response: ", dbResponse);
    response.status(201).send(dbResponse);
  });
}

module.exports = {
  getApis,
  getTopics,
  getArticleByID,
  getAllArticles,
  getCommentsByArticleID,
  postComment,
};
