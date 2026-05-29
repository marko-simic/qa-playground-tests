const { test, expect } = require("@playwright/test")

const user = {
  name: "John Doe",
  email: "john.doe@test.com",
  password: "Password123",
}

test.describe("Register Login", () => {
  test("Should display registration form by default", async ({ page }) => {
    await page.goto("apps/register-login/")

    await expect(page.locator("#register-view")).toBeVisible()
    await expect(page.locator("#login-view")).not.toBeVisible()
    await expect(page.locator("#dashboard-view")).not.toBeVisible()
  })

  test("Should switch to login form", async ({ page }) => {
    await page.goto("apps/register-login/")

    await page.locator("#go-to-login").click()

    await expect(page.locator("#login-view")).toBeVisible()
    await expect(page.locator("#register-view")).not.toBeVisible()
  })

  test("Should switch back to registration form", async ({ page }) => {
    await page.goto("apps/register-login/")

    await page.locator("#go-to-login").click()
    await page.locator("#go-to-register").click()

    await expect(page.locator("#register-view")).toBeVisible()
    await expect(page.locator("#login-view")).not.toBeVisible()
  })

  test("Should register a new account successfully", async ({ page }) => {
    await page.goto("apps/register-login/")

    await page.locator("#reg-name").fill(user.name)
    await page.locator("#reg-email").fill(user.email)
    await page.locator("#reg-password").fill(user.password)
    await page.locator("#reg-confirm").fill(user.password)
    await page.locator("#register-submit").click()

    await expect(page.locator("#login-view")).toBeVisible()
    await expect(page.locator("#login-alert")).toHaveText("Account created successfully! Please log in.")
  })

  test("Should show validation errors for empty registration form", async ({ page }) => {
    await page.goto("apps/register-login/")

    await page.locator("#register-submit").click()

    await expect(page.locator("#reg-name-error")).toHaveText("Full name is required")
    await expect(page.locator("#reg-email-error")).toHaveText("Email is required")
    await expect(page.locator("#reg-password-error")).toHaveText("Password is required")
    await expect(page.locator("#reg-confirm-error")).toHaveText("Please confirm your password")
  })

  test("Should show error for invalid email format", async ({ page }) => {
    await page.goto("apps/register-login/")

    await page.locator("#reg-name").fill(user.name)
    await page.locator("#reg-email").fill("not-a-valid-email")
    await page.locator("#reg-password").fill(user.password)
    await page.locator("#reg-confirm").fill(user.password)
    await page.locator("#register-submit").click()

    await expect(page.locator("#reg-email-error")).toHaveText("Enter a valid email address")
  })

  test("Should show error for password shorter than 8 characters", async ({ page }) => {
    await page.goto("apps/register-login/")

    await page.locator("#reg-name").fill(user.name)
    await page.locator("#reg-email").fill(user.email)
    await page.locator("#reg-password").fill("short")
    await page.locator("#reg-confirm").fill("short")
    await page.locator("#register-submit").click()

    await expect(page.locator("#reg-password-error")).toHaveText("Password must be at least 8 characters")
  })

  test("Should show error for mismatched passwords", async ({ page }) => {
    await page.goto("apps/register-login/")

    await page.locator("#reg-name").fill(user.name)
    await page.locator("#reg-email").fill(user.email)
    await page.locator("#reg-password").fill(user.password)
    await page.locator("#reg-confirm").fill("DifferentPassword!")
    await page.locator("#register-submit").click()

    await expect(page.locator("#reg-confirm-error")).toHaveText("Passwords do not match")
    await expect(page.locator("#register-view")).toBeVisible()
  })

  test("Should show error when registering with an already used email", async ({ page }) => {
    await page.goto("apps/register-login/")

    // Register the first time
    await page.locator("#reg-name").fill(user.name)
    await page.locator("#reg-email").fill(user.email)
    await page.locator("#reg-password").fill(user.password)
    await page.locator("#reg-confirm").fill(user.password)
    await page.locator("#register-submit").click()
    await expect(page.locator("#login-view")).toBeVisible()

    // Go back and try to register with the same email
    await page.locator("#go-to-register").click()
    await page.locator("#reg-name").fill("Jane Doe")
    await page.locator("#reg-email").fill(user.email)
    await page.locator("#reg-password").fill(user.password)
    await page.locator("#reg-confirm").fill(user.password)
    await page.locator("#register-submit").click()

    await expect(page.locator("#reg-email-error")).toHaveText("This email is already registered")
    await expect(page.locator("#register-view")).toBeVisible()
  })

  test("Should login with registered credentials", async ({ page }) => {
    await page.goto("apps/register-login/")

    // Register first (fresh context has no localStorage)
    await page.locator("#reg-name").fill(user.name)
    await page.locator("#reg-email").fill(user.email)
    await page.locator("#reg-password").fill(user.password)
    await page.locator("#reg-confirm").fill(user.password)
    await page.locator("#register-submit").click()
    await expect(page.locator("#login-view")).toBeVisible()

    // Login with the registered credentials
    await page.locator("#login-email").fill(user.email)
    await page.locator("#login-password").fill(user.password)
    await page.locator("#login-submit").click()

    await expect(page.locator("#dashboard-view")).toBeVisible()
    await expect(page.locator("#welcome-name")).toHaveText(user.name)
    await expect(page.locator("#welcome-email")).toHaveText(user.email)
  })

  test("Should show validation errors for empty login form", async ({ page }) => {
    await page.goto("apps/register-login/")

    await page.locator("#go-to-login").click()
    await page.locator("#login-submit").click()

    await expect(page.locator("#login-email-error")).toHaveText("Email is required")
    await expect(page.locator("#login-password-error")).toHaveText("Password is required")
  })

  test("Should show error for invalid login credentials", async ({ page }) => {
    await page.goto("apps/register-login/")

    await page.locator("#go-to-login").click()
    await page.locator("#login-email").fill("wrong@email.com")
    await page.locator("#login-password").fill("wrongpassword")
    await page.locator("#login-submit").click()

    await expect(page.locator("#login-alert")).toHaveText("Invalid email or password")
    await expect(page.locator("#login-view")).toBeVisible()
  })

  test("Should log out and return to login form", async ({ page }) => {
    await page.goto("apps/register-login/")

    // Register and login
    await page.locator("#reg-name").fill(user.name)
    await page.locator("#reg-email").fill(user.email)
    await page.locator("#reg-password").fill(user.password)
    await page.locator("#reg-confirm").fill(user.password)
    await page.locator("#register-submit").click()
    await page.locator("#login-email").fill(user.email)
    await page.locator("#login-password").fill(user.password)
    await page.locator("#login-submit").click()
    await expect(page.locator("#dashboard-view")).toBeVisible()

    await page.locator("#logout-btn").click()

    await expect(page.locator("#login-view")).toBeVisible()
    await expect(page.locator("#dashboard-view")).not.toBeVisible()
  })

  test("Should toggle password visibility in registration form", async ({ page }) => {
    await page.goto("apps/register-login/")

    const passwordInput = page.locator("#reg-password")
    const toggleButton = page.locator('[data-target="reg-password"]')

    await expect(passwordInput).toHaveAttribute("type", "password")

    await toggleButton.click()
    await expect(passwordInput).toHaveAttribute("type", "text")
    await expect(toggleButton).toHaveText("Hide")

    await toggleButton.click()
    await expect(passwordInput).toHaveAttribute("type", "password")
    await expect(toggleButton).toHaveText("Show")
  })
})
