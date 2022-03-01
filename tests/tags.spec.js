const { test, expect } = require("@playwright/test");

test.describe("Tags Input Box", () => {
  test("Should remove the last tag", async ({ page }) => {
    await page.goto("apps/tags-input-box/");
    await expect(page.locator('text="Tags"')).toBeVisible();

    const tags = page.locator(".content >> li"); // Get locators of all tags
    const tagsCount = await tags.count(); // Save the current tags count

    // Remove the last tag
    await tags.last().locator("i").click();

    await expect(tags).toHaveCount(tagsCount - 1);
  });

  test("Should add max number of tags", async ({ page }) => {
    await page.goto("apps/tags-input-box/");
    await expect(page.locator('text="Tags"')).toBeVisible();

    const newTags = [
      "vue",
      "python",
      "go",
      "react",
      "svelte",
      "tailwind",
      "linux",
      "ios",
      "android",
      "docker",
    ];

    const tags = page.locator(".content >> li"); // Get locators of all tags
    const inputField = page.locator(".content >> input");
    const tagsCount = await tags.count(); // Save the current tags count
    const currentCount = page.locator(".details >> p >> span");
    let remainingSlots = 10 - tagsCount;

    for (let index = 0; index < 10 - tagsCount; index++) {
      await inputField.type(newTags[index]);
      await inputField.press("Enter", { delay: 200 });
      remainingSlots--;
      await expect(tags.locator("text=" + newTags[index])).toBeVisible();
      await expect(currentCount).toHaveText(remainingSlots.toString());
    }

    await expect(currentCount).toHaveText("0");
  });

  test("Should remove all tags", async ({ page }) => {
    await page.goto("apps/tags-input-box/");
    await expect(page.locator('text="Tags"')).toBeVisible();

    await page.locator(".details >> button").click(); // "Remove All" button

    const currentCount = page.locator(".details >> p >> span");
    const tags = page.locator(".content >> li"); // Get locators of all tags

    await expect(currentCount).toHaveText("10");
    await expect(tags).toHaveCount(0);
  });
});
