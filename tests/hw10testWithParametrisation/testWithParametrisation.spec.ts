// аписати параметризований тест для форми

// https://demoqa.com/text-box

// Зробіть перевірку правильності вводу даних в середині форми і у формі виводу.

// (мінімум 5 наборів данних)

// const formData = [{якісь данні}, {якісь данні} і т.д.];

// for(const data of formData){
// test() {} }

import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

const testData = [
  {
    fullName: faker.internet.username(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
  },
  {
    fullName: faker.internet.username(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
  },
  {
    fullName: faker.internet.username(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
  },
  {
    fullName: faker.internet.username(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
  },
  {
    fullName: faker.internet.username(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
  },
];

const mainUrl = "https://demoqa.com/text-box";
async function compareInputAndOutput(page: Page, data: any) {
  const fullNameInput = page.locator('[id="userName"]');
  const emailInput = page.locator('[id="userEmail"]');
  const currentAddressInput = page.locator('[id="currentAddress"]');
  const permanentAddressInput = page.locator('[id="permanentAddress"]');
  const submitButton = page.locator('[id="submit"]');

  await fullNameInput.fill(data.fullName);
  await emailInput.fill(data.email);
  await currentAddressInput.fill(data.currentAddress);
  await permanentAddressInput.fill(data.permanentAddress);
  await submitButton.click();
}

let testId = 1;
for (const data of testData) {
  test(`ID${testId} - test`, async ({ page }) => {
    const fullNameOutput = page.locator("p#name");
    const emailOutput = page.locator("p#email");
    const currentAddressOutput = page.locator("p#currentAddress");
    const permanentAddressOutput = page.locator("p#permanentAddress");

    await page.goto(mainUrl);
    await compareInputAndOutput(page, data);

    await expect(fullNameOutput).toContainText(`${data.fullName}`);
    await expect(emailOutput).toContainText(`${data.email}`);
    await expect(currentAddressOutput).toContainText(`${data.currentAddress}`);
    await expect(permanentAddressOutput).toContainText(
      `${data.permanentAddress}`
    );
  });
  testId++;
}
