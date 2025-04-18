import { test, expect, Page, Locator } from "@playwright/test";
import path from "path";

class RegistrationForm {
  page: Page;
  firstNameInput: Locator;
  lastNameInput: Locator;
  genderRadio: Locator;
  mobileInput: Locator;
  fileInput: Locator;
  submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator("#firstName");
    this.lastNameInput = page.locator("#lastName");
    this.genderRadio = page.locator('//label[@for="gender-radio-1"]');
    this.mobileInput = page.locator("#userNumber");
    this.fileInput = page.locator("#uploadPicture");
    this.submitButton = page.locator("#submit");
  }

  async addFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async addLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async chooseGender() {
    await this.genderRadio.click();
  }

  async addMobileNumber(mobile: string) {
    await this.mobileInput.fill(mobile);
  }

  async uploadFile(filePath: string) {
    const absolutePath = path.resolve(__dirname, filePath);
    await this.fileInput.setInputFiles(absolutePath, { force: true } as any);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async expectSubmittedField(
    labelText: string,
    expectedValue: string | RegExp
  ) {
    const valueLocator = this.page.locator(
      `//td[contains(text(), '${labelText}')]/following-sibling::td`
    );
    await expect(valueLocator).toContainText(expectedValue);
  }
}

const baseUrl = "https://demoqa.com/automation-practice-form";

test("T001, Fill practice form", async ({ page }) => {
  await page.goto(baseUrl);
  const form = new RegistrationForm(page);

  await form.addFirstName("testFirst");
  await form.addLastName("testLast");
  await form.chooseGender();
  await form.addMobileNumber("1111111111");
  await form.uploadFile("logos/nikeLogo.png");

  await expect(form.fileInput).toHaveValue(/nikeLogo\.png$/);

  await form.submitForm();

  await form.expectSubmittedField("Student Name", "testFirst testLast");
  await form.expectSubmittedField("Mobile", "1111111111");
  await form.expectSubmittedField("Picture", /nikeLogo\.png$/);
});

class SignIn {
  page: Page;
  userNameInput: Locator;
  password: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator("#userName");
    this.password = page.locator("#password");
    this.loginButton = page.locator("#login");
  }

  async addUserNameInput(userName: string) {
    await this.userNameInput.fill(userName);
  }

  async addPassword(password: string) {
    await this.password.fill(password);
  }

  async loginButtonClick() {
    await this.loginButton.click();
  }
}

const loginUrl = "https://demoqa.com/login";

test("T002, Login", async ({ page }) => {
  await page.goto(loginUrl);
  const form = new SignIn(page);

  await form.addUserNameInput("testFirst");
  await form.addPassword("1111111111");
  await form.loginButtonClick();
});
