import { test, expect, chromium } from "@playwright/test";

//examples
//div[@class='cup']
//h4[contains(text(), 'Espresso')]
//

test("cart price changes when adding an item via RIGHT click modal", async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/login");
});
