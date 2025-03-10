const db = require("../db/connection");

function selectAllTopics() {
  return db.query("SELECT slug,description FROM topics");
}

module.exports = { selectAllTopics };
