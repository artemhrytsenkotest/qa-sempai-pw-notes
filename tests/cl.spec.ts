import { test, expect, chromium } from "@playwright/test";
import axios from "axios";
import exp from "constants";

const timestamp = Date.now().toString();
const short = timestamp.slice(-10);
const email = `t${short}@mail.com`;

const firstName = "test";
const lastName = "test";
const password = "qweqweQ!1";
const confirmPassword = "qweqweQ!1";
const COURIER_API_KEY = "pk_test_1Y9KB0WFXF4TE8JY5TJZF3RWH0AZ";
const RECIPIENT_EMAIL = email;

const brand = `b${short}`;
const shortBrandName = `b${short}`;
const companyName = `tl${short}`;
const companyEmail = `${companyName}@mail.com`;

async function waitForCourierLink({
  email,
  token,
  maxAttempts = 15,
  interval = 2000,
}: {
  email: string;
  token: string;
  maxAttempts?: number;
  interval?: number;
}): Promise<string> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await axios.get(
      `https://api.courier.com/messages?recipient=${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    const messageId = res.data?.results?.[0]?.id;

    if (!messageId) {
      console.log(`⌛ Attempt ${attempt} — message not yet found`);
      await new Promise((r) => setTimeout(r, interval));
      continue;
    }

    const detail = await axios.get(
      `https://api.courier.com/messages/${messageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    const text =
      detail.data.providers?.[0]?.providerResponse?.providerRequest?.body?.text;

    if (!text) {
      console.log(`📩 Attempt ${attempt} — message found, body not yet ready`);
      await new Promise((r) => setTimeout(r, interval));
      continue;
    }

    const match = text.match(/https:\/\/[^\s]+/g);
    const activationLink = match?.find((link) =>
      link.includes("loginstage.clearline.me")
    );

    if (activationLink) {
      console.log(`✅ Activation link found on attempt ${attempt}`);
      return activationLink;
    }

    console.log(`📜 Attempt ${attempt} — body ready but link not found`);
    await new Promise((r) => setTimeout(r, interval));
  }

  throw new Error(`❌ Activation link not found for ${email}`);
}

test.use({ viewport: { width: 1920, height: 1080 } });

test("TC1 - review request plan registration", async ({ page }) => {
  await page.goto("https://adminstage.clearline.me/", {
    waitUntil: "domcontentloaded",
  });
  //await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.locator('//a[contains(text(), "Sign Up")]').first().click();
  await page.locator('[name="FirstName"]').pressSequentially(firstName);
  await page.locator('[name="LastName"]').pressSequentially(lastName);
  await page.locator('[type="email"]').pressSequentially(email);
  await page.locator('[name="Password"]').pressSequentially(password);
  await page
    .locator('[name="ConfirmPassword"]')
    .pressSequentially(confirmPassword);
  await page.locator('[value="signup"]').click();
  await expect(page.locator("[id=btnSumbitModal]")).toBeVisible();
  await page.locator("[id=btnSumbitModal]").click();

  const activationLink = await waitForCourierLink({
    email: RECIPIENT_EMAIL,
    token: COURIER_API_KEY,
  });

  await page.goto(activationLink);
  await page.locator('//a[text() = " Start account configuration "]').click();

  //Step 1
  await expect(
    page.locator('//div[contains(text(), "Select Industry")]')
  ).toBeAttached();
  await page
    .locator(
      '//*[@formcontrolname="industryId"]//div//span[@class="ng-arrow-wrapper"]'
    )
    .click();
  await page
    .locator('//div[@role="listbox"]//span[contains(text(), "Repair Store")]')
    .click();
  await page.locator('//*[@placeholder="Brand Name"]').fill(brand);
  await page
    .locator('//*[@placeholder="Short Brand Name"]')
    .fill(shortBrandName);

  await page
    .locator('[class="image-logo-content image-logo-content-M uploader"]')
    .click();

  const fileChooserPromise = page.waitForEvent("filechooser");
  await page
    .locator('//div[text()="Click or drag images here to upload"]')
    .click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles("logos/nikeLogo.png");
  await page.locator('//button[text() = " Save Image "]').click();
  await page.locator('button:has-text("Next"):visible').click();

  //Step 2
  await page.locator('button:has-text("Next"):visible').click();

  //Step 3
  await page.locator('button:has-text("Next"):visible').click();

  //Step 4
  await page.locator('//input[@placeholder="Company Name"]').fill(companyName);
  await page.locator('//input[@placeholder="Address"]').fill("test");
  await page.locator('//input[@placeholder="Email"]').fill(companyEmail);
  await page
    .locator('//ng-select[@formcontrolname="billingState"]/div/span')
    .click();
  await page.locator('//span[contains(text(), "AL")]').click();
  await page.locator('//input[@placeholder="City"]').fill("test");
  await page.locator('//input[@placeholder="Phone Number"]').fill("1111111111");
  await page.locator('//input[@formcontrolname="billingZip"]').fill("11111");
  await page.locator('button:has-text("Next"):visible').click();

  //Step 5
  await page.locator('//*[contains(text(), "Review Request")]').click();
  //await page.locator("text=Review Request").click({ force: true });
  await page.locator('button:has-text("Next"):visible').nth(1).click();

  //Step 6
  await page
    .locator(
      '//div[contains(., "Review Request")]/following-sibling::div//input[@type="checkbox"]'
    )
    .click();
  await page.locator('//div[contains(., "Review Request")]//div/a').click();
  await page
    .locator('//label[contains(., "Email")]/preceding-sibling::input')
    .click();
  await page
    .locator('//label[contains(., "SMS")]/preceding-sibling::input[not(@name)]')
    .click();
  await page
    .locator('//input[@placeholder="Google"]')
    .pressSequentially("google.com");
  await expect(page.locator('//button[contains(., "Save")]')).toBeEnabled({
    enabled: true,
  });
  await page.locator('//button[contains(., "Save")]').click();
  await page.locator('button:has-text("Next"):visible').click();

  //Step 7
  await page.locator('//button[contains(., "Complete")]').click();

  await page
    .frameLocator("#cb-frame")
    .locator('button[data-cb-id="cart_submit"]')
    .click();
  await page
    .frameLocator("#cb-frame")
    .locator('//span[contains(., "Next")]')
    .nth(1)
    .click();
  await page
    .frameLocator("#cb-frame")
    .locator('//span[contains(., "Subscribe")]')
    .click();

  await expect(page.locator('//*[contains(text(), "Congrats!")]')).toHaveText(
    "Congrats!"
  );

  await page.goto("https://adminstage.clearline.me/manager/app-settings");
  await expect(
    page.locator("//app-widgets-form-control/div/app-tile")
  ).toHaveCount(1);
  await expect(
    page.locator('//*[contains(text(), "Review Request")]')
  ).toBeVisible();
  await expect(page.locator("//app-tile//input")).toBeChecked();

  await page
    .locator('//app-tile//div[contains(@class, "configured")]/a')
    .click();

  await expect(
    page.locator('//label[contains(text(), "Email")]')
  ).toBeChecked();
  await expect(page.locator('//label[contains(text(), "SMS")]')).toBeChecked();
  await expect(
    page.locator('//pre[contains(text(), "https://google.com")]')
  ).toContainText("https://google.com");
  await page.locator('//button[@class="btn-close"]').click();
  await page.locator('//app-tile//i[contains(@class, "mdi-eye")]').click();
  await page.waitForSelector("iframe.qr-code-iframe");
  await expect(
    page.frameLocator("iframe.qr-code-iframe").locator('img[src^="blob:"]')
  ).toBeVisible();

  //print the number of elements
  const count = await page
    .frameLocator("iframe.qr-code-iframe")
    .locator('img[src^="blob:"]')
    .count();
  console.log("QR image count:", count);

  await page.locator('//a[contains(text(), "View")]').click();
  await expect(
    page.locator('//*[contains(text(), "We want your feedback!")]')
  ).toBeVisible();
  await page.close();
});
