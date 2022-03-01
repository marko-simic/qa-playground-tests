const { test, expect } = require("@playwright/test");

test.describe("Multi Level Dropdown", () => {
  test("Should validate Setting sub-menu items", async ({ page }) => {
    await page.goto("apps/multi-level-dropdown/");
    await expect(page.locator(".navbar-nav")).toBeVisible();

    await page.locator(".icon-button").last().click(); // Opens main menu
    await page.locator("text=Settings").click(); // Opens Settings sub-menu

    await expect(page.locator(".menu-secondary-enter-done >> .menu-item")).toHaveText([
      "My Tutorial",
      "HTML",
      "CSS",
      "JavaScript",
      "Awesome!",
    ]);

    const links = page.locator(".menu-secondary-enter-done >> a:visible");
    const linksCount = await links.count();

    await expect(links).not.toHaveCount(0);

    const expectedLinks = ["#main", "#!HTML", "#!CSS", "#!JavaScript", "#!Awesome"];
    for (let i = 0; i < linksCount; i++) {
      await expect(links.nth(i)).toHaveAttribute("href", expectedLinks[i]);
    }
  });

  test("Should validate Animals sub-menu items", async ({ page }) => {
    await page.goto("apps/multi-level-dropdown/");
    await expect(page.locator(".navbar-nav")).toBeVisible();

    await page.locator(".icon-button").last().click(); // Opens main menu
    await page.locator("text=Animals").click(); // Opens Animals sub-menu

    await expect(page.locator(".menu-secondary-enter-done >> .menu-item")).toHaveText([
      "Animals",
      "🦘Kangaroo",
      "🐸Frog",
      "🦋Horse",
      "🦔Hedgehog",
    ]);

    const links = page.locator(".menu-secondary-enter-done >> a:visible");
    const linksCount = await links.count();

    await expect(links).not.toHaveCount(0);

    const expectedLinks = ["#main", "#!Kangaroo", "#!Frog", "#!Horse", "#!Hedgehog"];
    for (let i = 0; i < linksCount; i++) {
      await expect(links.nth(i)).toHaveAttribute("href", expectedLinks[i]);
    }
  });
});
