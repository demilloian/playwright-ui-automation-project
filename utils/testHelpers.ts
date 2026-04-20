import { Page } from '@playwright/test';

export async function openPage(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState('domcontentloaded');
}

export function normalizeText(value: string | null): string {
  return (value || '').trim().toLowerCase();
}