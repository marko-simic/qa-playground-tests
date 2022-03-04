const { test, expect } = require("@playwright/test");

test.describe.only("Onboarding", () => {
  test("Should close onboarding modal if it exists", async ({ page }) => {
    await page.goto("apps/onboarding-modal/");

    await page.pause();
  });
});
