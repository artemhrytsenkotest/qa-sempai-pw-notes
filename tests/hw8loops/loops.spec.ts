import { test, expect } from "@playwright/test";
import exp from "constants";

test("ID-123 add all items", async ({ page }) => {
  //don't forget to use ID in the test's name
  await page.goto("https://coffee-cart.app/");
  const count = await page.locator(".cup-body").count();
  for (let i = 0; i < count; i++) {
    await page.locator(".cup-body").nth(i).click();
    const promoLocator = await page
      .locator('//button[text()="Nah, I\'ll skip."]')
      .isVisible();
    if (promoLocator) {
      await page.locator('//button[text()="Nah, I\'ll skip."]').click();
    }
    console.log(`${i} printed`);
  }
  const numberOfCups = page.locator('//span[text()=" x 1"]');
  await expect(numberOfCups).toHaveCount(9);
});

// 2) Написати тест який би логінився/або створював нового юзера на https://demo.learnwebdriverio.com/
// І створював би три article, і потім перевіряв що всі створення aritcle є в списку your feed
// (приклад був на лекції)

test("verify if user logged in", async ({ page }) => {
  const newArticle = page.locator('//a[contains(text(), "New Article")]');
  const /* In the provided code snippet, `a` is not explicitly defined or referenced anywhere. It seems
  like there might be a typo or missing context in the question. If you can provide more
  information or clarify the context in which `a` is mentioned, I'd be happy to help further. */
    articleTitle = page.locator('//*[@placeholder = "Article Title"]');
  const articleAbout = page.locator(
    '//*[@placeholder = "What\'s this article about?"]'
  );
  const articleBody = page.locator(
    '//*[@placeholder="Write your article (in markdown)"]'
  );
  const tags = page.locator('//input[@data-qa-id="editor-tags"]');
  const nameForAllFields = "test1084121222";

  await page.goto("https://demo.learnwebdriverio.com/");
  await page.locator('//*[@href="/login"]').click();
  await page
    .locator('//input[@placeholder="Email"]')
    .fill("test210325@mailinator.com");
  await page.locator('//input[@placeholder="Password"]').fill("qweqweQ!1");
  await page.locator('//button[contains(text(), "")]').click();
  for (let i = 0; i < 3; i++) {
    await page.waitForSelector('//a[contains(text(), "New Article")]');
    await newArticle.click();
    await articleTitle.fill(nameForAllFields);
    await articleAbout.fill(nameForAllFields);
    await articleBody.fill(nameForAllFields);
    await tags.fill(nameForAllFields);
    await page.waitForSelector('//*[@type="submit"]');
    await page.locator('//*[@type="submit"]').click();
    await page.waitForSelector('//a[@class="author"]');
  }
  await page.goto("https://demo.learnwebdriverio.com/");
  // await page.waitForSelector(`//h1[text()="${nameForAllFields}"]`, {
  //   state: "attached",
  // });
  await page
    .locator(`//h1[text()="${nameForAllFields}"]`) // better to use this option
    .waitFor({ state: "attached" });
  const numberOfArticles = page.locator(`//h1[text()="${nameForAllFields}"]`);
  console.log(await numberOfArticles.count());
  await expect(numberOfArticles).toHaveCount(3);
});
