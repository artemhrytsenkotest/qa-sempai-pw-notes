import { test, expect, chromium } from "@playwright/test";
import exp from "constants";

// test('test44511', async() => {
//   const browser = await chromium.launch({headless: false});
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto('https://coffee-cart.app');
//   await page.pause();
// });
const baseUrl = "https://coffee-cart.app/";

test("cart price changes when adding an item via RIGHT click modal", async ({
  page,
}) => {
  const cappuccinoCoffee = page.locator('//div[@aria-label="Cappuccino"]');
  const yesButton = page.locator('//button[text()="Yes"]');
  const checkOutButton = page.locator(
    '//button[@aria-label="Proceed to checkout"]'
  );

  await page.goto(baseUrl);
  await cappuccinoCoffee.click({
    button: "right",
  });
  await yesButton.click();
  await expect(checkOutButton).toContainText("Total: $19.00");
});

test("cart price doesn't change when adding an item via RIGHT click modal", async ({
  page,
}) => {
  const cappuccinoCoffee = page.locator('//div[@aria-label="Cappuccino"]');
  const noButton = page.locator('//button[text()="No"]');
  const checkOutButton = page.locator(
    '//button[@aria-label="Proceed to checkout"]'
  );

  await page.goto(baseUrl);
  await cappuccinoCoffee.click({
    button: "right",
  });
  await noButton.click();
  await expect(checkOutButton).toContainText("Total: $0.00");
});

test("cart tab shows changes when adding elements from the menu", async ({
  page,
}) => {
  const cartPage = page.locator('//a[@aria-label="Cart page"]');
  const emptyCartPage = page.locator('//p[text()="No coffee, go add some."]');
  const menuPage = page.locator('//a[@aria-label="Menu page"]');
  const espressoCoffee = page.locator('//*[@data-test="Espresso"]');
  const espressoCoffeeOnCheckOutPage = page.locator(
    '//li//child::div[text()="Espresso"]'
  );

  await page.goto(baseUrl);
  await cartPage.click();
  await expect(emptyCartPage).toContainText("No coffee, go add some.");
  await menuPage.click();
  await espressoCoffee.click();
  await cartPage.click();
  await expect(espressoCoffeeOnCheckOutPage).toBeVisible();
});

test("items can be deleted from the cart tab via X button", async ({
  page,
}) => {
  const espressoCoffee = page.locator('//div[@data-test="Espresso"]');
  const cart = page.locator('//a[contains(text(), "cart")]');
  const deleteButton = page.locator('//button[@class="delete"]');
  const emptyCartPage = page.locator('//p[contains(text(), "No coffee")]');

  await page.goto(baseUrl);
  await espressoCoffee.click();
  await cart.click();
  await deleteButton.click();
  await expect(emptyCartPage).toContainText("No coffee, go add some.");
});

test("total on the menu page shows the same value as the total on the the cart page", async ({
  page,
}) => {
  const espressoMacchiato = page.locator(
    '//*[@data-test="Espresso_Macchiato"]'
  );
  const cartPage = page.locator('//*[@aria-label="Cart page"]');
  const plusButton = page.locator('//div/div/button[text()="+"]');
  const checkOutButton = page.locator('//*[@data-test="checkout"]');
  const menuPage = page.locator(
    '//a[@aria-label="Menu page" and contains(text(), "menu")]'
  );
  const checkOutButton2 = page.locator(
    '//button[@aria-label="Proceed to checkout"]'
  );

  await page.goto(baseUrl);
  await espressoMacchiato.click();
  await cartPage.click();
  await plusButton.click({ clickCount: 3 });
  //await plusButton.click();
  //await plusButton.click();
  await expect(checkOutButton).toContainText("Total: $48.00");
  await menuPage.click();
  await expect(checkOutButton2).toContainText("Total: $48.00");
});

//two more test for https://demo.learnwebdriverio.com/
test("verify if user logged in", async ({ page }) => {
  const email = `email${Date.now()}@example.com`;
  await page.goto("https://demo.learnwebdriverio.com/");
  await page.locator('//*[@href="/register"]').click();
  await page
    .locator('//input[@placeholder="Username"]')
    .fill("testUser14032533");
  await page.locator('//input[@placeholder="Email"]').fill(email);
  await page.locator('//input[@placeholder="Password"]').fill("qweqweQ!1");
  await page.locator('//button[contains(text(), "")]').click();
  await expect(
    page.locator('//div/div/div/p[text()="A place to share your knowledge."]')
  ).toContainText("A place to share your knowledge.");
});

test("verify empty sign up form UI errors", async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/");
  await page.locator('//a[@href="/register"]').click();
  await page
    .locator('//button[contains(normalize-space(), "Sign up")]')
    .click();
  await expect(
    page.locator('//ul/li[text()="username can\'t be blank"]')
  ).toContainText("username can't be blank");
  await expect(
    page.locator(
      '//ul/li/following-sibling::li[text()="email can\'t be blank"]'
    )
  ).toContainText("email can't be blank");
});
