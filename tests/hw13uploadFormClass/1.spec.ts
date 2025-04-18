import { test, Locator, Page } from "@playwright/test";
// Імпортуємо необхідні типи з Playwright:
// - test: для створення тестів
// - Locator: тип, який представляє елемент на сторінці
// - Page: тип, що представляє вебсторінку (вкладку браузера)

class SignUpPage {
  page: Page; // Зберігає посилання на сторінку
  usernameLocator: Locator; // Локатор для поля "Username"
  passwordLocator: Locator; // Локатор для поля "Password"
  emailLocator: Locator; // Локатор для поля "Email"
  signUpButtonLocator: Locator; // Локатор для кнопки реєстрації

  // Конструктор викликається при створенні об’єкта класу
  constructor(page: Page) {
    this.page = page; // Ініціалізуємо сторінку
    this.usernameLocator = this.page.locator('[placeholder="Username"]'); // Знаходимо поле введення username
    this.passwordLocator = this.page.locator('[placeholder="Password"]'); // Знаходимо поле введення password
    this.emailLocator = this.page.locator('[placeholder="Email"]'); // Знаходимо поле введення email
    this.signUpButtonLocator = this.page.locator(".btn"); // Знаходимо кнопку реєстрації за класом
  }

  async setUsername(username: string) {
    // Метод для заповнення поля "Username"
    await this.usernameLocator.fill(username); // Вводимо значення у відповідне поле
  }

  async setPassword(password: string) {
    // Метод для заповнення поля "Username"
    await this.passwordLocator.fill(password); // Вводимо значення у відповідне поле
  }

  async setEmail(email: string) {
    // Метод для заповнення поля "Username"
    await this.emailLocator.fill(email); // Вводимо значення у відповідне поле
  }

  async signUpButtonClick() {
    // Метод для заповнення поля "Username"
    await this.signUpButtonLocator.click(); // Вводимо значення у відповідне поле
  }
}

test("pom example", async ({ page }) => {
  const signUpPage = new SignUpPage(page);

  await page.goto("https://demo.learnwebdriverio.com/register");

  await signUpPage.setUsername("xasfa123123");
  await signUpPage.setPassword("xasfa12312331@gm.com");
  await signUpPage.setEmail("xasfa12312331@gm.com");
  await signUpPage.signUpButtonClick();
});

class SignInPage {
  page: Page; // Зберігає посилання на сторінку
  passwordLocator: Locator; // Локатор для поля "Password"
  emailLocator: Locator; // Локатор для поля "Email"
  signIpButtonLocator: Locator; // Локатор для кнопки реєстрації

  // Конструктор викликається при створенні об’єкта класу
  constructor(page: Page) {
    this.page = page; // Ініціалізуємо сторінку
    this.emailLocator = this.page.locator('[placeholder="Email"]'); // Знаходимо поле введення username
    this.passwordLocator = this.page.locator('[placeholder="Password"]'); // Знаходимо поле введення password
    this.signIpButtonLocator = this.page.locator(".btn"); // Знаходимо кнопку реєстрації за класом
  }

  async setEmail(email: string) {
    // Метод для заповнення поля "Username"
    await this.emailLocator.fill(email); // Вводимо значення у відповідне поле
  }

  async setPassword(password: string) {
    // Метод для заповнення поля "Username"
    await this.passwordLocator.fill(password); // Вводимо значення у відповідне поле
  }

  async signIpButtonClick() {
    // Метод для заповнення поля "Username"
    await this.signIpButtonLocator.click(); // Вводимо значення у відповідне поле
  }
}

test("pom example login", async ({ page }) => {
  const signIpPage = new SignInPage(page);

  await page.goto("https://demo.learnwebdriverio.com/login");

  await signIpPage.setEmail("xasfa12312331@gm.com");
  await signIpPage.setPassword("xasfa12312331@gm.com");
  await signIpPage.signIpButtonClick();
});
