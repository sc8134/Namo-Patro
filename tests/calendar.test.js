const { adToBs, bsToAd } = require("../backend/src/services/calendarService");

describe("BS/AD Conversion", () => {
  test("converts AD 2024-04-14 to BS 2081-01-01", () => {
    const result = adToBs(new Date("2024-04-14"));
    expect(result).toBe("2081-01-01");
  });

  test("converts BS 2081-01-01 back to AD 2024-04-14", () => {
    const result = bsToAd(2081, 1, 1);
    expect(result).toBe("2024-04-14");
  });
});
