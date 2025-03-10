function handleNotFoundError(response, message) {
  response.status(404).send({ status: 404, message: message });
}

module.exports = { handleNotFoundError };
