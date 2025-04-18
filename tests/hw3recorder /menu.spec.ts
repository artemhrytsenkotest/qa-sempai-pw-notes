import { test, expect, chromium } from "@playwright/test";

// test('test44511', async() => {
//   const browser = await chromium.launch({headless: false});
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto('https://coffee-cart.app');
//   await page.pause();
// });


test('cart price changes when adding an item via RIGHT click modal', async({page}) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cappuccino"]').click({
    button: 'right'
  });
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $19.00');
});


test("cart price doesn't change when adding an item via RIGHT click modal", async({page}) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cappuccino"]').click({
    button: 'right'
  });
  await page.getByRole('button', {name: 'No'}).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $0.00')
});


test("cart tab shows changes when adding elements from the menu", async({page}) => {
  await page.goto('https://coffee-cart.app/');
  await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(page.getByRole('paragraph')).toContainText('No coffee, go add some.');
  await page.getByRole('link', { name: 'Menu page' }).click();
  await page.locator('[data-test="Espresso"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(page.locator('div').filter({ hasText: /^Espresso$/ })).toBeVisible();
});


test("items can be deleted from the cart tab via X button", async({page}) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await page.getByRole('button', { name: 'Remove all Espresso' }).click();
  await expect(page.getByRole('paragraph')).toContainText('No coffee, go add some.');
});


test("total on the menu page shows the same value as the total on the the cart page", async({page}) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await page.getByRole('button', { name: 'Add one Espresso Macchiato' }).click();
  await page.getByRole('button', { name: 'Add one Espresso Macchiato' }).click();
  await page.getByRole('button', { name: 'Add one Espresso Macchiato' }).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $48.00');
  await page.getByRole('listitem').filter({ hasText: 'menu' }).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $48.00');
});
