const endpoints = require("../endpoints.json");
const { selectAllTopics } = require("../models/topics");
const {
  selectArticleByID,
  selectAllArticles,
  selectCommentsByArticleID,
  insertComment,
  updateVotes,
} = require("../models/articles");
const { checkArticleID } = require("./helpers");

function getApis(request, response) {
  response.status(200).send({ endpoints: endpoints });
}

function getTopics(request, response) {
  selectAllTopics().then((topics) => {
    response.status(200).send({ topics });
  });
}

function getArticleByID(request, response, next) {
  const article_id = Number(request.params.article_id);
  checkArticleID(article_id)
    .then(() => {
      selectArticleByID(article_id).then((article) => {
        response.status(200).send(article);
      });
    })
    .catch(next);
}

function getAllArticles(request, response, next) {
  const { sort_by, order, topic } = request.query;
  selectAllArticles(sort_by, order, topic)
    .then((articles) => {
      if (articles.length === 0) {
        const error = new Error("Not found");
        error.status = 404;
        error.detail = "No articles found";
        throw error;
      }
      response.status(200).send({ articles });
    })
    .catch(next);
}

function getCommentsByArticleID(request, response, next) {
  const article_id = Number(request.params.article_id);
  checkArticleID(article_id)
    .then(() => {
      selectCommentsByArticleID(article_id).then(({ comments }) => {
        response.status(200).send({ comments });
      });
    })
    .catch(next);
}

function postComment(request, response, next) {
  const article_id = Number(request.params.article_id);
  const { body } = request.body;
  const username = request.body.username?.toLowerCase();

  insertComment(article_id, username, body)
    .then((dbResponse) => {
      response.status(201).send(dbResponse);
    })
    .catch((error) => {
      next(error);
    });
}

function patchArticle(request, response, next) {
  const article_id = Number(request.params.article_id);
  const votes = request.body.inc_votes;

  //  if votes is missing, throw an error
  if (!votes || typeof votes !== "number") {
    const error = new Error("Bad request");
    error.status = 400;
    error.detail = "Missing property 'inc_votes'";
    throw error;
  }

  checkArticleID(article_id)
    .then(() => {
      // if everything is OK, proceed with updating votes
      updateVotes(article_id, votes).then((article) => {
        response.status(200).send(article);
      });
    })
    .catch(next);
}

module.exports = {
  getApis,
  getTopics,
  getArticleByID,
  getAllArticles,
  getCommentsByArticleID,
  postComment,
  patchArticle,
};
