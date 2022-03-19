const { test, expect } = require("@playwright/test")

test.describe("Geolocation", () => {
  test("Should change browser geolocation", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"])
    await context.setGeolocation({ longitude: -122.03118, latitude: 37.33182 })

    await page.goto("apps/geolocation/")
    await expect(page.locator("#get-location")).toBeVisible()

    const currentLocation = page.locator("#location-info")

    page.locator("#get-location").click()

    await expect(currentLocation).toContainText("Cupertino, United States")
  })
})
