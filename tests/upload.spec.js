const { test, expect } = require("@playwright/test");

test.describe("Upload", () => {
  test("Should upload an image file", async ({ page }) => {
    await page.goto("apps/upload/");
    await expect(page.locator("text=No File Selected")).toBeVisible();

    const file = process.cwd() + "/fixtures/demo.png";

    // Select one file to upload
    await page.setInputFiles("#file-input", file);

    const firstImageCaption = page.locator("#images >> figure >> nth=0 >> figcaption");

    await expect(firstImageCaption).toContainText("demo.png");
  });

  test("Should upload multiple image files", async ({ page }) => {
    await page.goto("apps/upload/");
    await expect(page.locator("text=No File Selected")).toBeVisible();

    const imgDir = process.cwd() + "/fixtures/";
    const images = ["demo.png", "demo2.png", "demo3.jpg"];

    // Select multiple files to upload
    await page.setInputFiles("#file-input", [
      imgDir + images[0],
      imgDir + images[1],
      imgDir + images[2],
    ]);

    const addedImages = page.locator("#images >> figure");

    // Validate that the images are displayed
    for (let index = 0; index < (await addedImages.count()); index++) {
      await expect(addedImages.nth(index)).toContainText(images[index]);
    }
  });
});
