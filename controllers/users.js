const { response } = require("../app");
const { selectAllUsers } = require("../models/users");

function getAllUsers(request, response, next) {
  selectAllUsers()
    .then(({ rows }) => {
      if (rows.length === 0) {
        const error = new Error("Not found");
        error.status = 404;
        error.detail = "No users found";
        throw error;
      }
      response.status(200).send({ users: rows });
    })
    .catch(next);
}

module.exports = { getAllUsers };
