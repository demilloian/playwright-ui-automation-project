import { expect, Page, Locator } from '@playwright/test';
import { openPage } from '../utils/testHelpers';

export class FormPage {
  private contactNameInput: Locator;
  private contactNumberInput: Locator;
  private pickupDateInput: Locator;
  private paymentMethodSelect: Locator;
  private registerButton: Locator;

  constructor(private page: Page) {
    this.contactNameInput = page.getByLabel('Contact Name');
    this.contactNumberInput = page.getByLabel('Contact number');
    this.pickupDateInput = page.locator('input[name="pickupdate"]');
    this.paymentMethodSelect = page.getByLabel('Payment Method');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async goto() {
    await openPage(this.page, '/form-validation');
  }

  async fillForm(
    contactName: string,
    contactNumber: string,
    pickupDate: string,
    paymentMethod: string
  ) {
    await this.contactNameInput.fill(contactName);
    await this.contactNumberInput.fill(contactNumber);
    await this.pickupDateInput.fill(pickupDate);

    if (paymentMethod) {
      await this.paymentMethodSelect.selectOption(paymentMethod);
    }
    
  }

  async submitForm() {
    await this.registerButton.click();
  }

  async verifySuccessMessage() {
    await expect(this.page.getByText(/validating your ticket/i)).toBeVisible();
  }

  async verifyValidationMessages() {
    await expect(this.page.getByText('Please enter your Contact name.')).toBeVisible();
    await expect(this.page.getByText('Please provide your Contact number.')).toBeVisible();
    await expect(this.page.getByText('Please provide valid Date.')).toBeVisible();
  }
}