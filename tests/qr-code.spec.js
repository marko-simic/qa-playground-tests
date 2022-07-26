const { test, expect } = require("@playwright/test")

test.describe("QR Code Generator", () => {
  test("Should visually validate generated image", async ({ page }) => {
    await page.goto("apps/qr-code-generator/")
    await expect(page.locator("text=QR Code Generator")).toBeVisible()

    await page.locator('[placeholder="Enter text or URL"]').fill("Playwright")
    await page.locator("button >> text=Generate QR Code").click()

    const imageLocator = page.locator(".qr-code >> img")

    await expect(imageLocator).toBeVisible()
    await expect(imageLocator).toHaveScreenshot()
  })
})
