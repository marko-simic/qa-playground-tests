const { test, expect } = require("@playwright/test");

test.describe.only("Hidden Elements", () => {
  test("Should click on the hidden button", async ({ page }) => {
    await page.goto("apps/outside-viewport/");
    await expect(page.locator("text=Click the button below")).toBeVisible();

    await page.locator("#fugitive").click();

    await page.pause();
  });
});
