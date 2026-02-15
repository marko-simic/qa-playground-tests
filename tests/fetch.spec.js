const { test, expect } = require("@playwright/test")

test.describe("Fetching Data", () => {
  test("Should load and display all posts", async ({ page }) => {
    // Wait for JSON
    const jsonResponsePromise = page.waitForResponse((resp) =>
      resp.url().includes("/posts"),
    )

    await Promise.all([page.goto("apps/fetch/"), jsonResponsePromise])

    expect(await page.locator(".icard").count()).toBeGreaterThan(90)
  })
})
