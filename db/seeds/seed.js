const db = require("../connection");
const format = require("pg-format");
const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../data/test-data");

const { convertTimestampToDate } = require("./utils");
const articles = require("../data/test-data/articles");
// const topicData = require("../data/test-data/topics");
// const userData = require("../data/test-data/users");

function seed({ topicData, userData, articleData, commentData }) {
  // return db.query(); //<< write your first query in here.
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
    .then(() => {
      return createTableTopics();
    })
    .then(() => {
      return createTableUsers();
    })
    .then(() => {
      return createTableArticles();
    })
    .then(() => {
      return createTableComments();
    })
    .then(() => {
      return seedTopicsData();
    })
    .then(() => {
      return seedUsersData();
    })
    .then(() => {
      return seedArticlesData();
    })
    .then((articlesData) => {
      return seedCommentsData(articlesData);
    });

  // dropTables();
  // createTableTopics();
}

function createTableTopics() {
  // slug field which is a unique string that acts as the table's primary key (a slug is a term used in publishing to identify an article)
  // description field which is a string giving a brief description of a given topic
  // img_url field which contains a string containing a link to an image representing the topic
  return db.query(
    `CREATE TABLE topics (
    slug VARCHAR(100) PRIMARY KEY NOT NULL,
    description VARCHAR(200) NOT NULL,
    img_url VARCHAR(1000) NOT NULL
    );`
  );
}

function createTableUsers() {
  // username which is the primary key & unique
  // name
  // avatar_url
  return db.query(
    `CREATE TABLE users (
    username VARCHAR(20) PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL,
    avatar_url VARCHAR(1000) NOT NULL);`
  );
}

function createTableArticles() {
  // Articles
  // Each article should have:

  // article_id which is the primary key
  // title
  // topic field which references the slug in the topics table
  // author field that references a user's primary key (username)
  // body
  // created_at defaults to the current timestamp
  // votes defaults to 0
  // article_img_url

  return db.query(
    `CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    topic VARCHAR(100),
    author VARCHAR(15) NOT NULL,
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT DEFAULT 0,
    article_img_url VARCHAR(1000),
    FOREIGN KEY (topic) REFERENCES topics(slug),
    FOREIGN KEY (author) REFERENCES users(username));`
  );
}

function createTableComments() {
  // comment_id which is the primary key
  // article_id field that references an article's primary key
  // body
  // votes defaults to 0
  // author field that references a user's primary key (username)
  // created_at defaults to the current timestamp
  return db.query(
    `CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    article_id INT,
    body TEXT,
    votes INT DEFAULT 0,
    author VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(article_id),
    FOREIGN KEY (author) REFERENCES users(username));`
  );
}

function seedTopicsData() {
  // convert data from json to a nested array
  const formattedTopicsData = topicData.map((topic) => {
    return [topic.slug, topic.description, topic.img_url];
  });

  // construct an SQL insert statement, use pgformat to correct format for PSQL
  const insertTopicsData = format(
    `INSERT INTO topics (slug, description, img_url)
    VALUES
    %L
    RETURNING *`,
    formattedTopicsData
  );

  return db.query(insertTopicsData);
}

function seedUsersData() {
  const formattedUsersData = userData.map((user) => {
    return [user.username, user.name, user.avatar_url];
  });

  const insertUsersData = format(
    `INSERT INTO users (username, name, avatar_url)
    VALUES
    %L`,
    formattedUsersData
  );

  return db.query(insertUsersData);
}

function seedArticlesData() {
  const formattedArticleTimestamps = articleData.map((article) => {
    return convertTimestampToDate(article);
  });

  const formattedArticleData = formattedArticleTimestamps.map((article) => {
    return [
      article.title,
      article.topic,
      article.author,
      article.body,
      article.created_at,
      article.votes,
      article.article_img_url,
    ];
  });

  const insertArticleData = format(
    `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url)
    VALUES
    %L
    RETURNING title, article_id`,
    formattedArticleData
  );

  return db.query(insertArticleData);
}

function seedCommentsData(articlesData) {
  const articleIdMap = new Map(
    articlesData.rows.map((article) => [article.title, article.article_id])
  );

  // process the data with convertTimestampToDate function to correctly format timestamp data
  const formattedCommentsTimestamps = commentData.map((comment) => {
    return convertTimestampToDate(comment);
  });

  //
  const formattedCommentsData = formattedCommentsTimestamps.map((comment) => {
    // lookup the current article_title and get correspnding article_id
    const articleId = articleIdMap.get(comment.article_title);
    if (!articleId) {
      throw new Error(
        `No article_id found for title: ${comment.article_title}`
      );
    }
    // store the fields in an array
    return [
      articleId,
      comment.body,
      comment.votes,
      comment.author,
      comment.created_at,
    ];
  });

  // construct the SQL INSERT query
  const insertCommentData = format(
    `INSERT INTO comments (article_id, body, votes, author, created_at)
      VALUES
      %L;`,
    formattedCommentsData
  );

  return db.query(insertCommentData);
}
module.exports = seed;
