function trim(value) {
  return typeof value === "string" ? value.trim() : value;
}

module.exports = { trim };
