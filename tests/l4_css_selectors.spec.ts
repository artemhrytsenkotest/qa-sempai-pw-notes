import { test, expect, chromium } from "@playwright/test";


test('cart price changes when adding an item via RIGHT click modal', async({page}) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByText('Username', { exact: true }).click();
  await page.getAttribute
  await page.getByAltText
  await page.getByLabel
  await page.getByPlaceholder
  await page.getByRole
  await page.getByTestId
  await page.getByText
  await page.locator
  });

//class search - isn't recommended because they can be changed
//.pay
//.ingredient.espresso

//tag
//attribute
//class
//id
//input[id*='name'] https://i.imgur.com/ETblozm.png


test("testasfasf", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");

  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.getByRole("link", { name: "Cart page" }).click();

  const listItem = page
    .locator(`//*[@class ='list-header']/following-sibling::li`)
    .getByText("Espresso Macchiato")
    .locator("//ancestor::*[@class = 'list-item']");

  await expect(listItem).toContainText("$12.00");
  await expect(listItem).toContainText("$12.00 x 1");
});
