const { test, expect } = require("@playwright/test")

test.describe("Redirection", () => {
  test("Should verify each redirection", async ({ page }) => {
    await page.goto("apps/redirect/")
    await expect(page.locator("text=Start Redirection chain")).toBeVisible()

    // 1st redirection
    const firstRedirectPromise = page.waitForResponse((response) =>
      response.url().includes("second")
    )
    // 2nd redirection
    const secondRedirectPromise = page.waitForResponse((response) =>
      response.url().includes("third")
    )
    // 3rd redirection
    const thirdRedirectPromise = page.waitForResponse((response) =>
      response.url().includes("fourth")
    )
    // 4th redirection
    const fourthRedirectPromise = page.waitForResponse((response) =>
      response.url().includes("fifth")
    )
    // 5th redirection
    const fifthRedirectPromise = page.waitForResponse((response) =>
      response.url().includes("sixth")
    )
    // 6th redirection
    const lastRedirectPromise = page.waitForResponse((response) =>
      response.url().includes("last")
    )

    await page.locator("#redirect").click() // Start redirects

    // Wait for the redirects to complete
    await firstRedirectPromise
    await secondRedirectPromise
    await thirdRedirectPromise
    await fourthRedirectPromise
    await fifthRedirectPromise
    await lastRedirectPromise

    // Verifies that the landing page is open
    await expect(page.locator("#info")).toHaveText("Welcome to the Last Page")
  })
})
