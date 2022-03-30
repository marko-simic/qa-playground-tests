const { test, expect } = require("@playwright/test");

test.describe("Links", () => {
  test("Should open each menu link in the new tab", async ({ page, context }) => {
    await page.goto("apps/links/");
    await expect(page.locator("#nav")).toBeVisible();

    const links = page.locator("#nav > a");

    await expect(links).toHaveCount(5);

    // Create a new tab page
    const newPage = await context.newPage();

    for (let index = 1; index < (await links.count()); index++) {
      const menuItemText = await links.nth(index).textContent();
      const nemuItemLink = await links.nth(index).getAttribute("href");

      await newPage.goto("/apps/links/" + nemuItemLink); // Open a link

      await expect(newPage.locator("#title")).toContainText(menuItemText);
    }

    newPage.close(); // Close the newly opened page
  });

  test("Should open each menu link by clicking on it", async ({ page }) => {
    await page.goto("apps/links/");
    await expect(page.locator("#nav")).toBeVisible();

    const links = page.locator("#nav > a");

    await expect(links).toHaveCount(5);

    for (let index = 1; index < (await links.count()); index++) {
      const menuItemText = await links.nth(index).textContent();

      await links.nth(index).click({ delay: 300 }); // Click on the menu item

      await expect(page.locator("#title")).toContainText(menuItemText);

      await page.goBack(); // Navigate back to the home page
    }
  });
});
