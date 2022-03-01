const { test, expect } = require("@playwright/test");

test.describe("Nested Iframe", () => {
  test("Should click on the button that is in two-level deep iframe", async ({ page }) => {
    await page.goto("apps/iframe/");
    await expect(page.locator("#frame1")).toBeVisible();

    // Get button locator
    const button = page.frameLocator("#frame1").frameLocator("#frame2").locator("text=Click Me");
    // Get info message locator
    const info = page.frameLocator("#frame1").frameLocator("#frame2").locator("#msg");

    // Click on the button
    await button.click();

    await expect(info).toBeVisible(); // Assert that the button clicked
  });
});
