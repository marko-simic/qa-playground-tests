const { test, expect } = require("@playwright/test")

test.describe("Pop-Up", () => {
  test("Should open a pop-up and click on the button in it", async ({
    page,
  }) => {
    await page.goto("apps/popup/")
    await expect(page.locator('text="Click to open pop-up"')).toBeVisible()

    // Open the popup and wait to catch the window handle
    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      page.locator("#login").click(),
    ])

    await expect(popup).toHaveURL(/popup/) // Asser pop-up's URL

    await expect(popup.locator("button")).toBeInViewport()
    await popup.locator("button").click() // Click on the button inside the pop-up

    // At the main window, assert that the button clicked
    await expect(page.locator("#info")).toHaveText("Button Clicked")
  })
})
