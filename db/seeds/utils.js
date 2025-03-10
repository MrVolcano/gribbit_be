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

function logRequestDetails(request) {
  const method = request.method; // HTTP method (e.g., GET, POST)
  const url = request.originalUrl; // Full URL
  const params = request.params; // URL parameters

  // Create a formatted message
  const message = `received: ${method} ${url}`;

  // Log the message to the console
  console.log(message);

  return message; // Return the message if needed
}

module.exports = { convertTimestampToDate, logRequestDetails };
