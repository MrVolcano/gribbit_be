const db = require("../db/connection");

function selectArticleByID(articleID) {
  return db.query("SELECT * FROM articles WHERE article_id = $1;", [articleID]);
}

module.exports = { selectArticleByID };
