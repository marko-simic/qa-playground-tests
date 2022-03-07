const { test, expect } = require("@playwright/test");
const fs = require("fs");

test.describe("Download", () => {
  test("Should download a PDF file", async ({ page }) => {
    await page.goto("apps/download/");
    await expect(page.locator("text=Click to download PDF file")).toBeVisible();

    const downButton = page.locator("#file");

    // Note that Promise.all prevents a race condition
    // between clicking and waiting for the download.
    const [download] = await Promise.all([
      // It is important to call waitForEvent before click to set up waiting.
      page.waitForEvent("download"),
      // Triggers the download.
      downButton.click(),
    ]);

    const fileName = download.suggestedFilename(); // Returns the file name from the server
    expect(fileName).toMatch("sample.pdf"); // Asserts file name

    // Saves download file
    await download.saveAs(fileName);

    const fileSizeInBytes = fs.statSync(fileName).size; // Get saved file size
    expect(fileSizeInBytes.toString()).toMatch("1042157"); // Asserts file size

    // Delete downloaded file
    fs.unlink(fileName, (err) => {
      if (err) throw err;
      // if no error, file has been deleted successfully
      // console.log("File deleted!");
    });
  });
});
