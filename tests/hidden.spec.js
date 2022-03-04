const { test, expect } = require("@playwright/test");

test.describe("Hidden Elements", () => {
  test("Should click on the hidden button", async ({ page }) => {
    await page.goto("apps/covered/");
    await expect(page.locator("text=Click the button below")).toBeVisible();

    const infoMsg = page.locator("#info"); // Select paragraph element

    await page.locator("#fugitive").click(); // Click on the button

    await expect(infoMsg).toHaveText("Mission accomplished"); // Assert changed message
  });
});
