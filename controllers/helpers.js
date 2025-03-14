const db = require("../db/connection");

// trim()
// currently unused function. I was going to use to validate input but decided FE should provide clean data.
// will remove when certain I wont use elsewhere!
function trim(value) {
  return typeof value === "string" ? value.trim() : value;
}

// checkRecordExists()
// initially intended to be a generic check for cases where we need to lookup and check if record exists before taking an action (author, article_id, user), but then realised better to create specific function say for article that handles other validation too. Currently not used.

function checkRecordExists(value, column, table) {
  const validColumns = ["article_id", "author"];
  const validTables = ["articles", "comments", "users"];

  if (!validColumns.includes(column) || !validTables.includes(table)) {
    return Promise.reject(new Error("Invalid column or table name"));
  }

  const queryText = `SELECT 1 FROM ${table} WHERE ${column} = $1 LIMIT 1;`;
  return db
    .query(queryText, [value])
    .then((result) => {
      return result.rows.length > 0;
    })
    .catch((error) => {
      console.error("recordExists error:", error);
      throw error;
    });
}

function checkArticleID(articleID) {

  if (typeof articleID !== "number" || isNaN(articleID)) {
    const error = new Error("Bad request");
    error.status = 400;
    error.detail = "article_id must be a valid number";
    throw error;
  }
  return db
    .query(`SELECT article_id FROM articles WHERE article_id = $1 LIMIT 1;`, [
      articleID,
    ])
    .then((response) => {
      if (response.rows.length === 0) {
        const error = new Error(`Not found`);
        error.status = 404;
        error.detail = `No article found with article_id: ${articleID}`;
        throw error;
      }
      return true;
    })
    .catch((error) => {
      if (!error.status) throw error;
      throw error;
    });
}

module.exports = { trim, checkRecordExists, checkArticleID };
