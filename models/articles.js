const db = require("../db/connection");

function selectArticleByID(articleID) {
  return db.query("SELECT * FROM articles WHERE article_id = $1;", [articleID]);
}

// function selectAllArticles({ sort_by = "created_at", order = "DESC" } = {}) {
function selectAllArticles(sort_by, order, topic) {
  if (sort_by === "" || sort_by === undefined || sort_by === null) {
    sort_by = "created_at";
  }
  if (order === "" || order === undefined || order === null) {
    order = "DESC";
  }

  console.log(sort_by, order, topic);

  // Whitelist valid columns to prevent SQL injection
  const validColumns = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];

  // Validate sort_by
  if (!validColumns.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      message: "Bad request",
      detail: `Invalid sort column: '${sort_by}'. Valid columns are: ${validColumns.join(
        ", "
      )}.`,
    });
  }

  // Validate order
  const validOrders = ["ASC", "DESC"];
  const normalisedOrder = order.toUpperCase(); // Normalize to uppercase
  if (!validOrders.includes(normalisedOrder)) {
    return Promise.reject({
      status: 400,
      message: "Bad request",
      detail: `Invalid order value: '${order}'. Must be 'ASC' or 'DESC'.`,
    });
  }

  // Validate topic
  if (topic === "") {
    return Promise.reject({
      status: 400,
      message: "Bad request",
      detail: "Topic query cannot be empty",
    });
  }

  // Build and execute the dynamic query
  let queryText = `
    SELECT 
      a.article_id,
      a.title,
      a.topic,
      a.author,
      a.created_at,
      a.votes,
      a.article_img_url,
      COUNT(c.comment_id) AS comment_count
    FROM 
      articles a
    LEFT JOIN 
      comments c ON a.article_id = c.article_id
  `;

  const queryParams = [];
  if (topic) {
    queryText += `  WHERE a.topic = $1`;
    queryParams.push(topic);
  }
  queryText += `
    GROUP BY 
      a.article_id
    ORDER BY 
      a.${sort_by} ${normalisedOrder};`;

  console.log(queryText);
  return db.query(queryText, queryParams);
}

function selectCommentsByArticleID(article_id) {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`,
      [article_id]
    )
    .then((result) => {
      return { comments: result.rows };
    });
}

function insertComment(article_id, author, body) {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
      [article_id, author, body]
    )

    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      throw error;
    });
}

function updateVotes(article_id, votes) {
  return db
    .query(
      `UPDATE articles 
     SET votes = CASE 
                   WHEN votes + $2 < 0 THEN 0 
                   ELSE votes + $2 
                 END 
     WHERE article_id = $1 
     RETURNING *;`,
      [article_id, votes]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      throw error;
    });
}

module.exports = {
  selectArticleByID,
  selectAllArticles,
  selectCommentsByArticleID,
  insertComment,
  updateVotes,
};
