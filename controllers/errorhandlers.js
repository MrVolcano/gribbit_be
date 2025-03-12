// function handleNotFoundError(response, message) {
//   response.status(404).send({ status: 404, message: message });
// }

function handle404(request, response, next) {
  response.status(404).send({ status: 404, message: "Not found" });
}

function handleErrors(error, request, response, next) {
  const status = error.status || 500; // Default to 500 if no status is provided
  console.log("handleErrors: ", error);
  console.log("handleErrors: ", error.detail);
  response.status(status).send({ status: status, message: error.message });
}

module.exports = { handle404, handleErrors };
