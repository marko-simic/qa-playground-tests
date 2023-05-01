const { test, expect } = require("@playwright/test")

const data = require("../fixtures/input-data.json")

const { UserPage } = require("../pages/budget-app/User")

test.describe.serial("Budget Tracker", () => {
  // Create one shared browser context for all tests
  /** @type {import('@playwright/test').Page} */
  let page

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
  })
  // \\ Create one shared browser context for all tests

  test("Should add all incomes and expenses", async () => {
    const user = new UserPage(page)

    await user.openApp()

    let calculatedTotal = 0
    for (let index = 0; index < data.length; index++) {
      const record = await user.addEntry(data[index])

      await page.reload() // Reload the page to verify persistent of data

      const expectedDate = user.convertDate(data[index].date)
      const receivedDate = user.convertDate(await record.date.inputValue())
      expect(receivedDate).toMatch(expectedDate)

      await expect(record.description).toHaveValue(data[index].description)
      await expect(record.type).toHaveValue(data[index].type)
      await expect(record.amount).toHaveValue(data[index].amount.toString())

      // Calculate the expected amount after entry
      if (data[index].type == "income") {
        calculatedTotal += Number(data[index].amount)
      } else if (data[index].type == "expense") {
        calculatedTotal -= Number(data[index].amount)
      }

      expect(record.total).toHaveText(
        // Converts a number to U.S. currency format string
        calculatedTotal.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      )
    }
  })

  test("Should modify first record", async () => {
    const user = new UserPage(page)

    await user.openApp()

    const modifiedEntry = {
      date: "01/01/2021",
      expected_date: "2021-01-01",
      description: "Inheritance",
      type: "income",
      amount: 50000,
    }

    const expectedTotal = "$45,300.00"

    const record = await user.editRow(1, modifiedEntry)

    await expect(record.date).toHaveValue(modifiedEntry.expected_date)
    await expect(record.description).toHaveValue(modifiedEntry.description)
    await expect(record.type).toHaveValue(modifiedEntry.type)
    await expect(record.amount).toHaveValue(modifiedEntry.amount.toString())

    expect(record.total).toHaveText(expectedTotal)
  })

  test("Should remove all the records", async () => {
    const user = new UserPage(page)

    await user.openApp()

    const records = await user.removeAllRecords()

    await expect(records).toHaveCount(0)
  })
})
