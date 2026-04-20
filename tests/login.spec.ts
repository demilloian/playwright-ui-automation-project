import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/loginPage';
import { loginData } from '../test-data/uiData';

test.describe('Login Automation', () => {
  test('Valid login should succeed', async ({ page }) => {
    await allure.owner('Christopher');
    await allure.feature('UI Automation');
    await allure.story('Login with valid credentials');
    await allure.severity('critical');
    await allure.tags('ui', 'login', 'positive');

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(loginData.validUsername, loginData.validPassword);
    await loginPage.verifySuccessfulLogin();
  });

  test('Invalid login should show error', async ({ page }) => {
    await allure.owner('Christopher');
    await allure.feature('UI Automation');
    await allure.story('Login with invalid credentials');
    await allure.severity('normal');
    await allure.tags('ui', 'login', 'negative');

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(loginData.invalidUsername, loginData.invalidPassword);
    await loginPage.verifyInvalidLogin();
  });

  test('User should logout successfully after login', async ({ page }) => {
    await allure.owner('Christopher');
    await allure.feature('UI Automation');
    await allure.story('Logout flow');
    await allure.severity('normal');
    await allure.tags('ui', 'login', 'logout');

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(loginData.validUsername, loginData.validPassword);
    await loginPage.verifySuccessfulLogin();
    await loginPage.logout();
    await loginPage.verifyLogoutSuccess();
  });
});