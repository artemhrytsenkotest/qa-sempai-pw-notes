import { test, expect, chromium, Page, Locator } from "@playwright/test";
import exp from "constants";
import path from "path";
import {fs} from 'fs'

function RegistrationForm(page: Page) {
  this.page = page;

  this.addFirstName = async (firstName: string) => {
    const firstNameInput: Locator = this.page.locator("#firstName");
    await firstNameInput.fill(firstName);
  };

  this.addLastName = async (lastName: string) => {
    const lastNameLocator: Locator = this.page.locator("#lastName");
    await lastNameLocator.fill(lastName);
  };

  this.chooseGender = async () => {
    const gender: Locator = this.page.locator('//label[@for="gender-radio-1"]');
    await gender.click();
  };

  this.addMobileNumber = async (mobileNum: string) => {
    const mobileNumber: Locator = this.page.locator("#userNumber");
    await mobileNumber.fill(mobileNum);
  };

  this.uploadFile = async (filePath: string) => {
    //const absolutePath = path.join(__dirname, filePath);
    //await this.page.locator("#uploadPicture").setInputFiles(absolutePath);
    const absolutePath = path.resolve(__dirname, filePath);
    const fileInput: Locator = this.page.locator("#uploadPicture");
    await fileInput.setInputFiles(absolutePath, { force: true } as any);
  };
}

const baseUrl = "https://demoqa.com/automation-practice-form";

test("T001, Fill practise form", async ({ page, context }) => {
  await page.goto(baseUrl);
  const registrationForm = new RegistrationForm(page);

  const cookies = await context.cookies();

  await registrationForm.addFirstName("testFirst2");
  await registrationForm.addLastName("testLast2");
  await registrationForm.chooseGender();
  await registrationForm.addMobileNumber("1111111111");
  await registrationForm.uploadFile("logos/nikeLogo.png");
  await expect(page.locator("#uploadPicture")).toHaveValue(/nikeLogo\.png$/);

  await page.locator("#submit").click();
  await expect(
    page.locator(
      "//td[contains(text(), 'Student Name')]//following-sibling::td"
    )
  ).toContainText("testFirst testLast");

  await expect(
    page.locator("//td[contains(text(), 'Mobile')]//following-sibling::td")
  ).toContainText("1111111111");

  await expect(
    page.locator("//td[contains(text(), 'Picture')]//following-sibling::td")
  ).toContainText("nikeLogo.png");
});

test("T002, Fill practise form2", async ({ page, context }) => {
  await page.goto("https://www.zara.com/ua/");
  const cookies = await context.cookies();
  console.log(cookies);
  cookies.find((cookie) => cookie.name.)
  const storageState = await context.storageState()
  const token = storageState.origins.find((value) => value.localStorage.fill(value)=> value.name === "id_token")
  
  fs.writeFileSync()

});
