const { test, expect } = require("@playwright/test");

test.describe("Context Menu", () => {
  test("Should click on each menu and sub-menu item", async ({ page }) => {
    await page.goto("apps/context-menu/");
    await expect(page.locator('text="Open Right-Click Context Menu"')).toBeVisible();

    const menuItems = ["Preview", "Get Link", "Rename", "Delete", "Settings"];
    const subMenuItems = ["Twitter", "Instagram", "Dribble", "Telegram"];

    const message = page.locator("#msg"); // html paragraph

    // Validate menu items
    for (let index = 0; index < menuItems.length; index++) {
      await page.click("body", { button: "right", delay: 300 }); // right click on the page
      await page.locator("text=" + menuItems[index]).click();
      await expect(message).toContainText(menuItems[index]);
    }

    // Validate sub-menu items
    for (let index = 0; index < subMenuItems.length; index++) {
      await page.click("body", { button: "right", delay: 300 }); // right click on the page
      await page.locator('text="Share"').hover(); // Opens Share sub-menu
      await page.locator(".share >> text=" + subMenuItems[index]).click();
      await expect(message).toContainText(subMenuItems[index]);
    }
  });
});
