function handle404(request, response, next) {
  response.status(404).send({ status: 404, message: "Not found" });
}

function handleDBErrors(error, request, response, next) {
  if (error.code === "23503") {
    return response.status(404).send({
      status: 404,
      message: "Not found",
      detail: error.detail,
    });
  }
  next(error);
}

function handleDefaultErrors(error, request, response, next) {
  const status = error.status || 500; // Default to 500 if no status is provided
  response
    .status(status)
    .send({ status: status, message: error.message, detail: error.detail });
}

module.exports = { handle404, handleDefaultErrors, handleDatabaseErrors: handleDBErrors };
