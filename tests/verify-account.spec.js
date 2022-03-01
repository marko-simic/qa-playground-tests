const { test, expect } = require("@playwright/test");

test.describe("Verify Account", () => {
  test("Should solve verification code by typing numbers", async ({ page }) => {
    await page.goto("apps/verify-account");
    await expect(page.locator('text="Verify Your Account"')).toBeVisible();

    const codeFields = page.locator(".code");
    for (let index = 0; index < (await codeFields.count()); index++) {
      codeFields.nth(index).type("9");
      await expect(codeFields.nth(index)).toHaveValue("9");
    }

    await expect(page.locator('text="Success"')).toBeVisible();
  });

  test("Should solve verification code by pressing the key-up button", async ({ page }) => {
    await page.goto("apps/verify-account");
    await expect(page.locator('text="Verify Your Account"')).toBeVisible();

    let codeValue = "0";
    const codeFields = page.locator(".code");
    for (let index = 0; index < (await codeFields.count()); index++) {
      while (codeValue != "9") {
        await codeFields.nth(index).press("ArrowUp", { delay: 100 });
        codeValue = await codeFields.nth(index).inputValue();
      }
      await expect(codeFields.nth(index)).toHaveValue("9");
      codeValue = "0";
    }

    await expect(page.locator('text="Success"')).toBeVisible();
  });
});
