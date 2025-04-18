import { test, Locator, Page } from "@playwright/test";

class SignUpPage {
  page: Page;
  usernameLocator: Locator;
  passwordLocator: Locator;
  emailLocator: Locator;
  signUpButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameLocator = this.page.locator('[placeholder="Username"]');
    this.passwordLocator = this.page.locator('[placeholder="Password"]');
    this.emailLocator = this.page.locator('[placeholder="Email"]');
    this.signUpButtonLocator = this.page.locator(".button");
  }

  async setUserName(username: string) {
    await this.usernameLocator.fill(username);
  }
}

test("pom example", async ({ page }) => {
  const singUpPage = new SignUpPage(page);
  await page.goto("https://demo.learnwebdriverio.com/register");
  await singUpPage.setUserName("testName");

  //await singUpPage.usernameLocator.fill("qwe");
});
