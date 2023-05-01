exports.UserPage = class UserPage {
  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page
  }

  async openApp() {
    await this.page.goto("apps/budget-tracker/")
    await this.page.locator(".budget-tracker").waitFor({ state: "visible" })
  }

  async addEntry(record) {
    const previousRecords = await this.page.locator(".entries >> tr").count()

    await this.page.locator('text="New Entry"').click()

    const currentRow = this.page.locator(".entries >> tr").nth(previousRecords)
    const date = currentRow.locator('[type="date"]')
    const description = currentRow.locator(".input-description")
    const type = currentRow.locator(".input-type")
    const amount = currentRow.locator(".input-amount")
    const total = this.page.locator(".total")

    // Setting date by executing JavaScript code in the page
    await date.evaluate(
      (datepicker, date) => (datepicker.value = date),
      record.date
    )

    await description.type(record.description)
    await type.selectOption(record.type)
    await amount.clear()
    await amount.type(record.amount.toString())
    await amount.press("Enter")

    return {
      date: date,
      description: description,
      type: type,
      amount: amount,
      total: total,
    }
  }

  async editRow(row, record) {
    const currentRow = this.page.locator(".entries >> tr").nth(row - 1)
    const date = currentRow.locator('[type="date"]')
    const description = currentRow.locator(".input-description")
    const type = currentRow.locator(".input-type")
    const amount = currentRow.locator(".input-amount")
    const total = this.page.locator(".total")

    await date.type(record.date)
    await description.clear()
    await description.type(record.description)
    await type.selectOption(record.type)
    await amount.clear()
    await amount.type(record.amount.toString())
    await amount.press("Enter")

    return {
      date: date,
      description: description,
      type: type,
      amount: amount,
      total: total,
    }
  }

  async removeAllRecords() {
    const rows = this.page.locator(".entries >> tr")
    for (let index = await rows.count(); index > 0; index--) {
      await rows
        .nth(index - 1)
        .locator(".delete-entry")
        .click({ delay: 300 })
    }

    return rows
  }

  convertDate(date) {
    return new Date(date).toLocaleString("en-US")
  }
}
