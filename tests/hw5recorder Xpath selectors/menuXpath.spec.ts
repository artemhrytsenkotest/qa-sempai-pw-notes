import { test, expect, chromium } from "@playwright/test";
import exp from "constants";

// test('test44511', async() => {
//   const browser = await chromium.launch({headless: false});
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto('https://coffee-cart.app');
//   await page.pause();
// });

test("cart price changes when adding an item via RIGHT click modal", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('//div[@aria-label="Cappuccino"]').click({
    button: "right",
  });
  await page.locator('//button[text()="Yes"]').click();
  await expect(
    page.locator('//button[@aria-label="Proceed to checkout"]')
  ).toContainText("Total: $19.00");
});

test("cart price doesn't change when adding an item via RIGHT click modal", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('//div[@data-test="Cappuccino"]').click({
    button: "right",
  });
  await page.locator('//button[text()="No"]').click();
  await expect(
    page.locator('//button[@aria-label="Proceed to checkout"]')
  ).toContainText("Total: $0.00");
});

test("cart tab shows changes when adding elements from the menu", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('//a[@aria-label="Cart page"]').click();
  await expect(
    page.locator('//p[text()="No coffee, go add some."]')
  ).toContainText("No coffee, go add some.");
  await page.locator('//a[@aria-label="Menu page"]').click();
  await page.locator('//*[@data-test="Espresso"]').click();
  await page.locator('//a[@aria-label="Cart page"]').click();
  await expect(
    page.locator('//li//child::div[text()="Espresso"]')
  ).toBeVisible();
});

test("items can be deleted from the cart tab via X button", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('//div[@data-test="Espresso"]').click();
  await page.locator('//a[contains(text(), "cart")]').click();
  await page.locator('//button[@class="delete"]').click();
  await expect(
    page.locator('//p[contains(text(), "No coffee")]')
  ).toContainText("No coffee, go add some.");
});

test("total on the menu page shows the same value as the total on the the cart page", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('//*[@data-test="Espresso_Macchiato"]').click();
  await page.locator('//*[@aria-label="Cart page"]').click();
  await page.locator('//div/div/button[text()="+"]').click();
  await page.locator('//div/div/button[text()="+"]').click();
  await page.locator('//div/div/button[text()="+"]').click();
  await expect(page.locator('//*[@data-test="checkout"]')).toContainText(
    "Total: $48.00"
  );
  await page
    .locator('//a[@aria-label="Menu page" and contains(text(), "menu")]')
    .click();
  await expect(
    page.locator('//button[@aria-label="Proceed to checkout"]')
  ).toContainText("Total: $48.00");
});

//two more test for https://demo.learnwebdriverio.com/
test("verify if user logged in", async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/");
  // краще одразу перехожити на сторінку реєстрації
  // https://demo.learnwebdriverio.com/register
  await page.locator('//*[@href="/register"]').click();
  await page
    .locator('//input[@placeholder="Username"]')
    .fill("testUser14032533");
  await page
    .locator('//input[@placeholder="Email"]')
    .fill("testUser14032533@mailinator.com");
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
