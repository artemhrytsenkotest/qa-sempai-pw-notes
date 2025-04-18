import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();

  await page.getByRole('link', { name: 'Cart page' }).click();

  await page.locator('div').getByText("Cappuccino").click();
  await page.locator('div').filter({ hasText: /^Espresso$/ }).click();
  await page.locator('div').filter({ hasText: /^Espresso Macchiato$/ }).click();
});