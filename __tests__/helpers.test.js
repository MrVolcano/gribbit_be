const {
  trim,
  checkArticleID,
  checkRecordExists,
} = require("../controllers/helpers");
const seed = require("../db/seeds/seed"); // db seeding function
const data = require("../db/data/test-data/index"); // test seed data
const db = require("../db/connection");

// reseed database before each test
beforeEach(() => {
  return seed(data);
});

// close DB connection after all tests complete
afterAll(() => {
  return db.end();
});

// helper function intended to sanitize input, but decided that should be FE devs responsibility.
// Keeping for now incase its needed.
describe("trim", () => {
  test("return a clean string with leading/trailing spaces removed", () => {
    const string = "   this is a string      ";
    result = trim(string);
    expect(result).toBe("this is a string");
  });
  test("returns undefined when passed an empty string", () => {
    const string = undefined;
    result = trim(string);
    expect(result).toBe(undefined);
  });
  test("returns a number when passed a number", () => {
    const string = 999;
    result = trim(string);
    expect(result).toBe(999);
  });
});

describe("recordExists", () => {
  test("returns true if record exists", () => {
    return checkRecordExists(1, "article_id", "articles").then((result) => {
      expect(result).toBe(true);
    });
  });

  test("returns false if no record exists", () => {
    return checkRecordExists(9999, "article_id", "articles").then((result) => {
      expect(result).toBe(false);
    });
  });

  test("throws error for invalid column", () => {
    return checkRecordExists(1, "bad_column", "articles").catch((error) => {
      expect(error.message).toBe("Invalid column or table name");
    });
  });
});

describe("checkArticleID", () => {
  test("should return true when articleID is a valid number and exists in the DB", () => {
    return checkArticleID(1).then((result) => {
      expect(result).toBe(true);
    });
  });

  test("should throw a 400 error when articleID is not a number", () => {
    expect(() => checkArticleID("abc")).toThrow(
      expect.objectContaining({
        message: "Bad request",
        detail: "article_id must be a valid number",
        status: 400,
      })
    );
  });

  test("should throw a 400 error when articleID is undefined", () => {
    expect(() => checkArticleID(undefined)).toThrow(
      expect.objectContaining({
        message: "Bad request",
        detail: "article_id must be a valid number",
        status: 400,
      })
    );
  });

  test("should throw a 400 error when articleID is NaN", () => {
    expect(() => checkArticleID(NaN)).toThrow(
      expect.objectContaining({
        message: "Bad request",
        detail: "article_id must be a valid number",
        status: 400,
      })
    );
  });

  test("should throw a 404 error when articleID does not exist in the DB", () => {
    return checkArticleID(9999).catch((error) => {
      expect(error.status).toBe(404);
      expect(error.message).toBe("Not found");
      expect(error.detail).toBe("No article found with article_id: 9999");
    });
  });
});
