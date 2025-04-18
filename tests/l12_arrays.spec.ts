import { Page } from "@playwright/test";
import { notEqual } from "assert";

//arrays

const arr1 = [
  "text",
  true,
  undefined,
  null,
  123,
  { a: "test" },
  function () {
    console.log(1);
  },
];

const arr2 = new Array(
  "text",
  true,
  undefined,
  null,
  123,
  { a: "test" },
  function () {
    console.log(1);
  }
);
//error because of TypeScript

const arr3 = new Array(10);
console.log(arr3.length);
// length isn't equal to array items' indexes

const articlesTitle = ["art1", "art2", "art3"];
console.log(articlesTitle[0]);
console.log(articlesTitle[1]);
console.log(articlesTitle[2]);
console.log(articlesTitle[3]);

for (let i = 0; i < articlesTitle.length; i++) {
  console.log(`${articlesTitle[i]}`);
}

articlesTitle.push("Artem");
console.log(articlesTitle.length);

console.log(typeof articlesTitle);

const arr: string[] = ["123", 23];

//
const fruits = ["apple", "banana", "orange"];

// for (let i = 0; i < fruits.length; i++) {
//   console.log(fruits[i]);
// }

for (const fruit of fruits) {
  console.log(fruit);
}

//LECTURE FROM 29.03.25
const newArr = [1, 2, 3, 4, 5];

console.log(newArr.pop());

console.log(newArr);

const notSortedArr = [123, 33, 1, 2, 3, 4, 454511, 94, 33];
notSortedArr.sort((a, b) => a - b);
console.log(notSortedArr);

//filter
const notFiltered = [123, 33, 1, 2, 3, 4, 454511, 94, 33];
console.log(notFiltered.filter((element) => element % 2 === 0));

//find
console.log(notFiltered.find((element) => element % 3 === 0));

//
const response = {
  id: 12353,
  names: ["artem", "max", "pavlo", "artem"],
  isActive: true,
};

console.log(response.names.find((element, index, arr) => element === "artem"));
console.log(response.names.includes("artem");
console.log(response.names.filter((element, index, arr) => element === "artem"));

//map