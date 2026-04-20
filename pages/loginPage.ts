import { expect, Page, Locator } from '@playwright/test';
import { openPage } from '../utils/testHelpers';

export class LoginPage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private logoutButton: Locator;
  private flashMessage: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
    this.flashMessage = page.locator('#flash');
  }

  async goto() {
    await openPage(this.page, '/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(/.*secure/);
    await expect(this.flashMessage).toContainText('You logged into a secure area!');
    await expect(this.logoutButton).toBeVisible();
  }

  async verifyInvalidLogin() {
    await expect(this.flashMessage).toContainText(/username is invalid|password is invalid/i);
  }

  async logout() {
    await this.logoutButton.click();
  }

  async verifyLogoutSuccess() {
    await expect(this.flashMessage).toContainText('You logged out of the secure area!');
  }
}