import { test, expect } from '@playwright/test';

test('payment modal opens', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Americano"]').click();
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('h1')).toContainText('Payment details');
});

test('additional header opens when ordering 3 items', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.getByText('It\'s your lucky day! Get an extra cup of Mocha for $4.espressochocolate')).toBeVisible();
});

test('payment modal shows correct input', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Flat_White"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('123');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('123@123.com');
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('123');
  await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('123@123.com');
});

test('success message appears after checkOut', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('testName');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('emailTest@test.com');
  await page.getByLabel('Promotion message').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.');
});

test('all items can be added to the cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Mocha"]').click();
  await page.locator('[data-test="Flat_White"]').click();
  await page.locator('[data-test="Americano"]').click();
  await page.locator('[data-test="Cafe_Latte"]').click();
  await page.locator('[data-test="Cafe_Breve"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $105.00');
});

test('cart changes value when extra cup added', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $41.00');
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $45.00');
});

test('cart value remains unchanged when extra cup not added', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $41.00');
  await page.getByRole('button', { name: 'Nah, I\'ll skip.' }).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $41.00');
});

test('cart resets value after page reload', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $19.00');
  await page.goto('https://coffee-cart.app/');
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $0.00');
});

test('menu item is visible', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await expect(page.getByRole('listitem').filter({ hasText: 'menu' })).toBeVisible();
});

test('cart has 0 value on page first open', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $0.00');
});