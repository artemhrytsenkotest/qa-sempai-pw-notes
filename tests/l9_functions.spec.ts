import { Page } from "@playwright/test";

//function declaration
//hoisting
function sayHi(name) {
  const greetings = `Hello! My name is ${name}.`;
  console.log(greetings);
}

//argument(значення параметру) vs parameter

sayHi("Artem");
sayHi("Max");

function cartPageTab(page: Page) {
  return page.locator('//a[@aria-label="Cart page]');
}

//function expression
//doesn't have hoisting
const generateName = function () {
  console.log("123");
};

//generateName()

//arrow function
const sayHi2 = (param1, param2) => {
  console.log(param1);
  console.log(param2);
};

sayHi2("abc", "artem");
