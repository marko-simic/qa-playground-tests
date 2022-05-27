const { test, expect } = require("@playwright/test");

test.describe("Changeable Iframe", () => {
  test("Should verify 53 seconds as remaining time and message at the end", async ({ page }) => {
    await page.goto("apps/changing-iframe/");
    await expect(page.locator("#frame1")).toBeVisible();

    // Get timer locator
    const time = page.frameLocator("#frame1").locator("#time");
    // Get info message locator
    const info = page.frameLocator("#frame1").locator("#msg");

    await expect(time).toHaveText("00:53", { timeout: 10000 });

    await expect(info).toHaveText("This is the end of the journey");
  });
});
