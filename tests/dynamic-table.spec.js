const { test, expect } = require("@playwright/test");

test.describe("Dynamic Table", () => {
  test("Should verify Spider-Man's real name", async ({ page }) => {
    await page.goto("apps/dynamic-table/");
    await expect(page.locator("text=SUPERHERO")).toBeVisible();

    const realName = "Peter Parker";
    const row = page.locator('text="Spider-Man" >> xpath=../../../..');
    const realNameCell = row.locator("td").nth(2);

    await expect(realNameCell).toHaveText(realName);
  });
});
