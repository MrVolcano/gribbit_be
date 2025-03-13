const { checkArticleID } = require("./helpers");

function checkArticleIdMiddleware(request, response, next) {
  const article_id = Number(request.params.article_id);
  checkArticleID(article_id)
    .then(() => {
      request.article_id = article_id; // Store the validated number back in request.params
      next();
    })
    .catch(next);
}

module.exports = { checkArticleIdMiddleware };
