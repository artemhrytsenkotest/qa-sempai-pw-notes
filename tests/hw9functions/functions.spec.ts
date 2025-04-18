import { test, expect, chromium, Page } from "@playwright/test";
import exp from "constants";

//two more test for https://demo.learnwebdriverio.com/

async function isLoggedIn(
  page: Page,
  username: string,
  email: string,
  password: string
) {
  await page.goto("https://demo.learnwebdriverio.com/");
  await page.locator('//*[@href="/register"]').click();
  await page.locator('//input[@placeholder="Username"]').fill(username);
  await page.locator('//input[@placeholder="Email"]').fill(email);
  await page.locator('//input[@placeholder="Password"]').fill(password);
  await page.locator('//button[contains(text(), "")]').click();
  await expect(
    page.locator('//div/div/div/p[text()="A place to share your knowledge."]')
  ).toContainText("A place to share your knowledge.");
}

// test("verify login functionality", async ({ page }) => {
//   await isLoggedIn(
//     page,
//     "test3102251",
//     "test3102251@mailinator.com",
//     "test3102251"
//   );
// });

async function registrationButtonLocator(page: Page) {
  await page.locator('//*[contains(text(), "Sign up")]').click();
}

test("verify empty sign up form UI errors", async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/");
  await registrationButtonLocator(page);
  await page.locator('//button[contains(text(), "Sign up")]').click();
  await expect(
    page.locator('//ul/li[text()="username can\'t be blank"]')
  ).toContainText("username can't be blank");
  await expect(
    page.locator(
      '//ul/li/following-sibling::li[text()="email can\'t be blank"]'
    )
  ).toContainText("email can't be blank");
});
