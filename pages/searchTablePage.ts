import { expect, Page, Locator } from '@playwright/test';
import { openPage, normalizeText } from '../utils/testHelpers';

export class SearchTablePage {
  private searchInput: Locator;
  private table: Locator;
  private rows: Locator;
  private infoText: Locator;

  constructor(private page: Page) {
    this.searchInput = page.locator('input[type="search"]');
    this.table = page.locator('table');
    this.rows = page.locator('table tbody tr');
    this.infoText = page.locator('#example_info');
  }

  async goto() {
    await openPage(this.page, '/dynamic-pagination-table');
  }

  async search(keyword: string) {
    await this.searchInput.fill(keyword);
  }

  async verifyResultsContain(keyword: string) {
    await expect(this.table).toBeVisible();

    const rowCount = await this.rows.count();
    expect(rowCount).toBeGreaterThan(0);

    for (let i = 0; i < rowCount; i++) {
      const rowText = await this.rows.nth(i).textContent();
      expect(normalizeText(rowText)).toContain(keyword.toLowerCase());
    }
  }

  async verifyNoMatchingResults() {
    await expect(this.infoText).toContainText(/0 to 0 of 0|0 entries|filtered from/i);
  }
}