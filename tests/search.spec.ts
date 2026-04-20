import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { SearchTablePage } from '../pages/searchTablePage';
import { searchData } from '../test-data/uiData';

test.describe('Search Automation', () => {
  test('User should filter table results successfully', async ({ page }) => {
    await allure.owner('Christopher');
    await allure.feature('UI Automation');
    await allure.story('Search with existing keyword');
    await allure.severity('normal');
    await allure.tags('ui', 'search', 'positive');

    const searchPage = new SearchTablePage(page);

    await searchPage.goto();
    await searchPage.search(searchData.existingKeyword);
    await searchPage.verifyResultsContain(searchData.existingKeyword);
  });

  test('User should see no matching results for unknown keyword', async ({ page }) => {
    await allure.owner('Christopher');
    await allure.feature('UI Automation');
    await allure.story('Search with missing keyword');
    await allure.severity('normal');
    await allure.tags('ui', 'search', 'negative');

    const searchPage = new SearchTablePage(page);

    await searchPage.goto();
    await searchPage.search(searchData.missingKeyword);
    await searchPage.verifyNoMatchingResults();
  });
});