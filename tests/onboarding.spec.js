const { test, expect } = require("@playwright/test");

test.describe("Onboarding", () => {
  test("Should close onboarding modal if it exists", async ({ page }) => {
    await page.goto("apps/onboarding-modal/");
    await expect(page.locator(".title")).toBeVisible();

    const title = page.locator(".title");
    const modal = await page.locator("#active").isChecked();
    const closeButton = page.locator('[for="active"]');

    // Check if modal is displayed
    if (modal) {
      await closeButton.click();
      await expect(title).toHaveText("Welcome Peter Parker! 🕷🎉");
    } else {
      await expect(title).toHaveText("Application successfully launched! 🚀");
    }
  });
});
