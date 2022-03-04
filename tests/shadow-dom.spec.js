const { test, expect } = require("@playwright/test");

test.describe("Shadow DOM", () => {
  test("Should boost progress bar by clicking on the button", async ({ page }) => {
    await page.goto("apps/shadow-dom/");
    await expect(page.locator("text=Boost 🚀")).toBeVisible();

    await page.locator("button").click();

    const progressBar = page.locator("progress-bar");

    await expect(progressBar).toHaveAttribute("percent", "95", { timeout: 7000 });
  });
});
