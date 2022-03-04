const { test, expect } = require("@playwright/test");

test.describe("Rating", () => {
  test("Should rate with one star", async ({ page }) => {
    await page.goto("apps/rating/");
    await expect(page.locator(".stars")).toBeVisible();

    const emoji = page.locator("#star-1"); // Select first emoji
    const stars = page.locator(".stars >> label");

    await stars.nth(0).click(); // Click on the first star

    // Assert selected stars
    await expect(stars.nth(0)).toHaveCSS("color", "rgb(255, 221, 68)");

    // Assert that the related emoji is displayed
    await expect(emoji).toBeChecked();

    // Assert message text for one star
    let msg = await page.$eval(".footer >> .text", (elem) => {
      // Get CSS computed content property
      return window.getComputedStyle(elem, ":before").getPropertyValue("content");
    });
    expect(msg).toMatch("I just hate it");

    // Assert numerically represented rate
    let rate = await page.$eval(".footer >> .numb", (elem) => {
      // Get CSS computed content property
      return window.getComputedStyle(elem, ":before").getPropertyValue("content");
    });
    expect(rate).toMatch("1 out of 5");
  });

  test("Should rate with two stars", async ({ page }) => {
    await page.goto("apps/rating/");
    await expect(page.locator(".stars")).toBeVisible();

    const emoji = page.locator("#star-2"); // Select second emoji
    const emojiPosition = page.locator(".slideImg");
    const stars = page.locator(".stars >> label");

    await stars.nth(1).click(); // Click on the second star

    // Assert selected stars
    await expect(stars.nth(0)).toHaveCSS("color", "rgb(255, 221, 68)");
    await expect(stars.nth(1)).toHaveCSS("color", "rgb(255, 221, 68)");

    // Assert that the related emoji is displayed
    expect(emoji).toBeChecked;
    await expect(emojiPosition).toHaveCSS("margin-top", "-135px");

    // Assert message text for one star
    let msg = await page.$eval(".footer >> .text", (elem) => {
      // Get CSS computed content property
      return window.getComputedStyle(elem, ":before").getPropertyValue("content");
    });
    expect(msg).toMatch("I don't like it");

    // Assert numerically represented rate
    let rate = await page.$eval(".footer >> .numb", (elem) => {
      // Get CSS computed content property
      return window.getComputedStyle(elem, ":before").getPropertyValue("content");
    });
    expect(rate).toMatch("2 out of 5");
  });

  test("Should rate with three stars", async ({ page }) => {
    await page.goto("apps/rating/");
    await expect(page.locator(".stars")).toBeVisible();

    const emoji = page.locator("#star-3"); // Select third emoji
    const emojiPosition = page.locator(".slideImg");
    const stars = page.locator(".stars >> label");

    await stars.nth(2).click(); // Click on the third star

    // Assert selected stars
    await expect(stars.nth(0)).toHaveCSS("color", "rgb(255, 221, 68)");
    await expect(stars.nth(1)).toHaveCSS("color", "rgb(255, 221, 68)");
    await expect(stars.nth(2)).toHaveCSS("color", "rgb(255, 221, 68)");

    // Assert that the related emoji is displayed
    expect(emoji).toBeChecked;
    await expect(emojiPosition).toHaveCSS("margin-top", "-270px");

    // Assert message text for one star
    let msg = await page.$eval(".footer >> .text", (elem) => {
      // Get CSS computed content property
      return window.getComputedStyle(elem, ":before").getPropertyValue("content");
    });
    expect(msg).toMatch("This is awesome");

    // Assert numerically represented rate
    let rate = await page.$eval(".footer >> .numb", (elem) => {
      // Get CSS computed content property
      return window.getComputedStyle(elem, ":before").getPropertyValue("content");
    });
    expect(rate).toMatch("3 out of 5");
  });

  test("Should rate with four stars", async ({ page }) => {
    await page.goto("apps/rating/");
    await expect(page.locator(".stars")).toBeVisible();

    const emoji = page.locator("#star-4"); // Select fourth emoji
    const emojiPosition = page.locator(".slideImg");
    const stars = page.locator(".stars >> label");

    await stars.nth(3).click(); // Click on the fourth star

    // Assert selected stars
    await expect(stars.nth(0)).toHaveCSS("color", "rgb(255, 221, 68)");
    await expect(stars.nth(1)).toHaveCSS("color", "rgb(255, 221, 68)");
    await expect(stars.nth(2)).toHaveCSS("color", "rgb(255, 221, 68)");
    await expect(stars.nth(3)).toHaveCSS("color", "rgb(255, 221, 68)");

    // Assert that the related emoji is displayed
    expect(emoji).toBeChecked;
    await expect(emojiPosition).toHaveCSS("margin-top", "-405px");

    // Assert message text for one star
    let msg = await page.$eval(".footer >> .text", (elem) => {
      // Get CSS computed content property
      return window.getComputedStyle(elem, ":before").getPropertyValue("content");
    });
    expect(msg).toMatch("I just like it");

    // Assert numerically represented rate
    let rate = await page.$eval(".footer >> .numb", (elem) => {
      // Get CSS computed content property
      return window.getComputedStyle(elem, ":before").getPropertyValue("content");
    });
    expect(rate).toMatch("4 out of 5");
  });

  test("Should rate with five stars", async ({ page }) => {
    await page.goto("apps/rating/");
    await expect(page.locator(".stars")).toBeVisible();

    const emoji = page.locator("#star-5"); // Select fifth emoji
    const emojiPosition = page.locator(".slideImg");
    const stars = page.locator(".stars >> label");

    await stars.nth(4).click(); // Click on the fifth star

    // Assert selected stars
    await expect(stars.nth(0)).toHaveCSS("color", "rgb(255, 221, 68)");
    await expect(stars.nth(1)).toHaveCSS("color", "rgb(255, 221, 68)");
    await expect(stars.nth(2)).toHaveCSS("color", "rgb(255, 221, 68)");
    await expect(stars.nth(3)).toHaveCSS("color", "rgb(255, 221, 68)");
    await expect(stars.nth(4)).toHaveCSS("color", "rgb(255, 221, 68)");

    // Assert that the related emoji is displayed
    expect(emoji).toBeChecked;
    await expect(emojiPosition).toHaveCSS("margin-top", "-540px");

    // Assert message text for one star
    let msg = await page.$eval(".footer >> .text", (elem) => {
      // Get CSS computed content property
      return window.getComputedStyle(elem, ":before").getPropertyValue("content");
    });
    expect(msg).toMatch("I just love it");

    // Assert numerically represented rate
    let rate = await page.$eval(".footer >> .numb", (elem) => {
      // Get CSS computed content property
      return window.getComputedStyle(elem, ":before").getPropertyValue("content");
    });
    expect(rate).toMatch("5 out of 5");
  });
});
