const { test, expect } = require("@playwright/test");

test.describe("Redirection", () => {
  test("Should verify each redirection", async ({ page }) => {
    await page.goto("apps/redirect/");
    await expect(page.locator("text=Start Redirection chain")).toBeVisible();

    await page.locator("#redirect").click(); // Start redirects

    await expect(page).toHaveURL(/second/); // 1st redirection
    await expect(page).toHaveURL(/third/); // 2nd redirection
    await expect(page).toHaveURL(/fourth/); // 3rd redirection
    await expect(page).toHaveURL(/fifth/); // 4th redirection
    await expect(page).toHaveURL(/sixth/); // 5th redirection
    await expect(page).toHaveURL(/last/); // 6th redirection

    // Verifies that the landing page is open
    await expect(page.locator("#info")).toHaveText("Welcome to the Last Page");
  });
});
