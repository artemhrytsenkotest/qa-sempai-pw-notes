import { test, expect } from "@playwright/test";

//for
test("adding all items to the cart using loop", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");

  const count = await page.locator(".cup-body").count();
  // i = 1 + 1   the same as   i++
  for (let i = 0; i < count; i++) {
    await page.locator(".cup-body").nth(i).click();
    console.log(`${i} printed`);
  }
});

test("adding all items to the cart using loop2", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");

  const count = await page.locator(".cup-body").count();
  // i = 1 + 1   the same as   i++
  for (let i = 0; i < count; i++) {
    await page.locator(".cup-body").nth(i).click();
    console.log(`${i} printed`);
  }
});

//while

// let i = 100;
// while (i > 1) {
//   console.log(i);
// }

// do while

// let i = 100
// do {
//   console.log(i);
//   i--;
// } while (i > 1);

//for each

//for of

//for in

const someObj = {
  i: 1,
  b: 2,
};

for (const key in someObj) {
  console.log(key);
}
