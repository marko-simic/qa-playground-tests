const { test, expect } = require("@playwright/test");

test.describe("New Tab", () => {
  test("Should open new tab with correct text", async ({ page, context }) => {
    await page.goto("apps/new-tab");
    
    const openTabButton = page.getByRole("link", { name: "Open New Tab" });
    await expect(openTabButton).toBeVisible();

    // Wait for new page event
    const pagePromise = context.waitForEvent("page");

    // Open new page
    await openTabButton.click();

    // Resolve promise to interact with new tab
    const newPage = await pagePromise;

    // Assert new page heading has correct text
    await expect(newPage.getByRole("heading")).toHaveText("Welcome to the new page!");
  });
});