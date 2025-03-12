const { trim } = require("../controllers/helpers");

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
