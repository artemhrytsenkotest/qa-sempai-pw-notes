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
  await page.locator('[method="dialog"] button:first-of-type').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $19.00');
});


test("cart price doesn't change when adding an item via RIGHT click modal", async({page}) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cappuccino"]').click({
    button: 'right'
  });
  await page.locator('[method="dialog"] button:nth-of-type(2)').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $0.00')
});


test("cart tab shows changes when adding elements from the menu", async({page}) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[href="/cart"]').click();
  await expect(page.locator('div[class="list"] p')).toContainText('No coffee, go add some.');
  await page.locator('[aria-label="Menu page"]').click();
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[href="/cart"]').click();
  await expect(page.locator('[class="list-header"]+li[class="list-item"] div').filter({ hasText: /^Espresso$/ })).toBeVisible();
});


test("items can be deleted from the cart tab via X button", async({page}) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[aria-label="Cart page"]').click();
  await page.locator('.delete').click();
  await expect(page.locator('div p')).toContainText('No coffee, go add some.');
});


test("total on the menu page shows the same value as the total on the the cart page", async({page}) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[aria-label="Cart page"]').click();
  await page.locator('li div div.unit-controller button:nth-of-type(odd)').click();
  await page.locator('li div div.unit-controller button:nth-of-type(odd)').click();
  await page.locator('li div div.unit-controller button:nth-of-type(odd)').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $48.00');
  await page.locator('[aria-label="Menu page"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $48.00');
});


test("elementsVisible", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");

  await expect(
    page.locator(".cup-body[data-test]").filter({ visible: true })
  ).toHaveCount(9);
});