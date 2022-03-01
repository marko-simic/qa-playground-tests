const { test, expect } = require("@playwright/test");

test.describe("Sortable List", () => {
  test("Should reorder the list to match the correct order", async ({ page }) => {
    await page.goto("apps/sortable-list");
    await expect(page.locator('text="10 Richest People"')).toBeVisible();

    const items = page.locator(".person-name"); // Mark all list items

    // Expected order of names
    const topList = [
      { position: 1, name: "Jeff Bezos" },
      { position: 2, name: "Bill Gates" },
      { position: 3, name: "Warren Buffett" },
      { position: 4, name: "Bernard Arnault" },
      { position: 5, name: "Carlos Slim Helu" },
      { position: 6, name: "Amancio Ortega" },
      { position: 7, name: "Larry Ellison" },
      { position: 8, name: "Mark Zuckerberg" },
      { position: 9, name: "Michael Bloomberg" },
    ];

    // Iterate through the list and move items to the correct position
    let currentPosition, distance;
    for (let index = 0; index < topList.length; index++) {
      // Determine the current position of the name
      currentPosition = await page
        .locator("text='" + topList[index].name + "' >> .. >> .. >> .number")
        .textContent();

      // Calculate the distance from the correct position
      distance = currentPosition - topList[index].position;

      // Continue with the loop because the item is in the correct place
      if (distance == 0) continue;

      // The element is close enough to the target and can be moved immediately
      if (distance < 5) {
        await page.locator("text='" + topList[index].name + "'").scrollIntoViewIfNeeded();
        await page.dragAndDrop(
          "text='" + topList[index].name + "'",
          "text='" + topList[index].position + "'",
          {
            force: true,
          }
        );
      }

      // Move item step by step since the target position is not in the viewport
      for (let pos = currentPosition; pos > topList[index].position - 1; pos--) {
        // If the target is very close, do not scroll
        if (pos - topList[index].position > 1) {
          await page.locator("text='" + (pos - 1) + "'").scrollIntoViewIfNeeded();
        }

        await page.dragAndDrop("text='" + topList[index].name + "'", "text='" + pos + "'", {});

        // If failed to move an item, try again
        if ((await items.nth(pos - 1).textContent()) != topList[index].name) {
          await page.dragAndDrop("text='" + topList[index].name + "'", "text='" + pos + "'", {});
        }
        // Assert that the item is in the correct temporary position
        await expect(items.nth(pos - 1)).toHaveText(topList[index].name);
      }

      // Assert that the item is in the correct position
      await expect(items.nth(index)).toHaveText(topList[index].name);
    }

    await page.locator("#check").click(); // Initiates order validation

    // Assert that all elements are in place
    for (let i = 0; i < (await items.count()); i++) {
      await expect(items.nth(i)).toHaveCSS("color", "rgb(58, 227, 116)");
    }
  });
});
