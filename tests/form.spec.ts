import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { FormPage } from '../pages/formPage';
import { formData } from '../test-data/uiData';

test.describe('Form Automation', () => {
  test('User should submit form successfully', async ({ page }) => {
    await allure.owner('Christopher');
    await allure.feature('UI Automation');
    await allure.story('Valid form submission');
    await allure.severity('critical');
    await allure.tags('ui', 'form', 'positive');

    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillForm(
      formData.valid.contactName,
      formData.valid.contactNumber,
      formData.valid.pickupDate,
      formData.valid.paymentMethod
    );
    
    await formPage.submitForm();
    await formPage.verifySuccessMessage();


  });

  test('User should see validation messages for empty required fields', async ({ page }) => {
    await allure.owner('Christopher');
    await allure.feature('UI Automation');
    await allure.story('Invalid form submission');
    await allure.severity('normal');
    await allure.tags('ui', 'form', 'negative', 'validation');

    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillForm(
      formData.invalid.contactName,
      formData.invalid.contactNumber,
      formData.invalid.pickupDate,
      formData.invalid.paymentMethod
    );
    await formPage.submitForm();
    await formPage.verifyValidationMessages();
  });
});