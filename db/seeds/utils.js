const db = require("../../db/connection");
const { keys } = require("../data/test-data/articles");

// exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
//   if (!created_at) return { ...otherProperties };
//   return { created_at: new Date(created_at), ...otherProperties };
// };

function convertTimestampToDate({ created_at, ...otherProperties }) {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
}

module.exports = { convertTimestampToDate };
