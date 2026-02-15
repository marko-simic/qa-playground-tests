const { test, expect } = require("@playwright/test");

test.describe("New Tab", () => {
  test("Should open new tab with correct text", async ({ page, context }) => {
    await page.goto("apps/new-tab");
    
    const openTabButton = page.getByRole("link", { name: "Open New Tab" });
    await expect(openTabButton).toBeVisible();

    // Open new tab and catch the new Page object
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      openTabButton.click(),
    ]);

    // Assert new page heading has correct text
    await expect(newPage.getByRole("heading")).toHaveText("Welcome to the new page!");
  });
});