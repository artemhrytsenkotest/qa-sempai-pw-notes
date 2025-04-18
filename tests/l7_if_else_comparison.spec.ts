import { test, expect, chromium } from "@playwright/test";
import exp from "constants";

const a = 11;
const b = 11;

console.log(a > b); //trues/false
console.log(a < b);
console.log(b == a);
console.log(b === a); //compares type and value
console.log(a <= b);
console.log(a >= b);
console.log(a !== b);
console.log(a != b);

//wait expect(1).toBeGreaterThan(10);
//await expect(1).toBeGreaterThanOrEqual(10);
// await expect(1).toBeLessThan(10);
// await expect(1).toBeLessThanOrEqual(10);
// await expect(false).toBeFalsy();
// await expect(false).toBeTruthy();

//test("expect testing", async () => {
// 10 >
// expect(10).toBeGreaterThan(10);

// 10 >=
// expect(10).toBeGreaterThanOrEqual(10);

// 10 <
// expect(10).toBeLessThan(10);

// 10 <=
// expect(10).toBeLessThanOrEqual(10);

//false, 0, '', null, undefined or NaN
//expect(0).toBeFalsy();

// expect({ a: 1, b: 2 }).toMatchObject({ b: 3, a: 1 });

// const response = null;
// //false, 0, '', null, undefined or NaN
// expect("").toBeTruthy();
// expect(response).toBeTruthy();

// expect(0).toBeTruthy();
//});

//if

const temperature = 10;

if (temperature >= 15) {
  console.log("vetrovka");
}

if (temperature < 15) {
  console.log("kofta + vetrovka");
}

let hasTicket = false;

// if (hasTicket === true) {
//   console.log("ok");
// }

if (hasTicket === false) {
  console.log("no");
}

if (!hasTicket) {
  console.log("ок");
}

//

const age = 18;
if (age >= 18) {
  console.log("can serve");
} else {
  console.log("can't serve");
}

//unit tests
//програма, яка визначає, чи дане число є додатним чи ні.
const number = 0;

function isPositive(number) {
  if (number > 0) {
    return true;
  } else return false;
}

test("should be positive", () => {
  const result = isPositive(1);
  expect(result).toBeTruthy();
});
