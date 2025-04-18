// ДЗ №9 функці/масиви

// 1️⃣ Перевірка масиву
// ✏️ Напиши функцію, яка перевіряє, чи є input масивом.
// Тестові дані:
// console.log(isArray('QA DOJO')); // false
// console.log(isArray([1, 2, 4, 0])); // true
// function isArray (param) {
//   if param
// }

//not the best solution. Array.isArray() should work better
function isArray(param) {
  if (typeof param === "string") {
    const result = false;
    return result;
  }
  if (typeof param === "object") {
    const result = true;
    return result;
  }
}

console.log(isArray("QA DOJO")); // false
console.log(isArray([1, 2, 4, 0])); // true

// 2️⃣ Клонування масиву
// ✏️ Напиши функцію для створення копії масиву.
// Тестові дані:
// console.log(cloneArray([1, 2, 4, 0])); // [1, 2, 4, 0]
// console.log(cloneArray([1, 2, [4, 0]])); // [1, 2, [4, 0]]

//not the best solution.
function cloneArray(arr: Array<any>) {
  const newArr: Array<any> = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
}

console.log(cloneArray([1, 2, 4, 0, 6]));
console.log(cloneArray([1, 2, [4, 0]]));

// 3️⃣ Перші елементи масиву
// ✏️ Напиши функцію для отримання перших n елементів масиву.
// Тестові дані:
// console.log(first([7, 9, 0, -2])); // 7
// console.log(first([7, 9, 0, -2], 3)); // [7, 9, 0]

//slice() can also be used
function first(arr: Array<any>, num?: number) {
  const newArray: Array<any> = [];
  if (num === undefined) {
    newArray.push(arr[0]);
    return newArray;
  } else {
    for (let i = 0; i < num; i++) {
      newArray.push(arr[i]);
    }
    return newArray;
  }
}

console.log(first([7, 9, 0, -2]));
console.log(first([7, 9, 0, -2], 3));

// Останні елементи масиву
// ✏️ Напиши функцію для отримання останніх n елементів масиву.
// Тестові дані:
// console.log(last([7, 9, 0, -2])); // -2
// console.log(last([7, 9, 0, -2], 3)); // [9, 0, -2]

//slice() can also be used
function last(arr: Array<any>, num?: number) {
  const newArray: Array<any> = [];
  if (num === undefined) {
    const removedItem = arr.pop();
    newArray.push(removedItem);
    return newArray;
  } else {
    for (let i = 0; i < num; i++) {
      const removedItem = arr.pop();
      newArray.push(removedItem);
    }
    return newArray.reverse(); // is this correct?
  }
}

console.log(last([7, 9, 0, -2]));
console.log(last([7, 9, 0, -2], 3));

// Об’єднання елементів масиву
// ✏️ Напиши програму, що об'єднує елементи масиву у строку.   (гугліть як це зробити)
// Приклад:
// myColor = ["Red", "Green", "White", "Black"];
// // "Red,Green,White,Black"
// // "Red+Green+White+Black"

//+ is hardcoded, variable might be added
function combineElements(arr: Array<any>, symbol: string) {
  const newArr = arr.join(`${symbol}`);
  // const newArr = arr.join();
  return console.log(newArr);
}

combineElements(["Red", "Green", "White", "Black"], "+");

// Дефіси між парними числами
// ✏️ Програма, що додає дефіси між парними числами.   (завдання із зірочкою ⭐️)
// Приклад:
// Ввід: 025468
// Вивід: 0-254-6-8

function isEven(number) {
  let result = "";

  for (let i = 0; i < number.length; i++) {
    const currentNumber = number[i];
    const nextNumber = number[i + 1];

    result += currentNumber;

    if (currentNumber % 2 === 0 && nextNumber % 2 === 0) {
      result += "-";
    }
  }

  return result;
}
console.log(isEven("2234566"));

// 7️⃣ Сортування масиву
// ✏️ Напиши програму для сортування чисел у масиві.   (завдання із зірочкою ⭐️)
// Приклад:
// var arr1 = [-3, 8, 7, 6, 5, -4, 3, 2, 1];
// // Вивід: -4,-3,1,2,3,5,6,7,8
// ЦИКЛИ

function sorting(arr) {
  const sortedArrey = arr;
  sortedArrey.sort(function (a, b) {
    return a - b;
  });

  console.log(sortedArrey);
}

sorting([1, 2, 3, 4, 5, 3, 2, 1, 5, 6, 3, 2]);

// Числа від 1 до 345
// ✏️ Використай цикл, щоб  щоб створити масив з числами  від 1 до 345.

function array345() {
  const finalNumber: number[] = [];
  for (let i = 1; i <= 345; i++) {
    finalNumber.push(i);
  }
  return finalNumber;
}

console.log(array345());

// Сума чисел від 1 до 100
// ✏️ Напиши програму, яка знайде суму чисел від 1 до 100.

function addNumber() {
  let totalAmout = 0;
  for (let i = 1; i <= 100; i++) {
    totalAmout += i;
  }
  return totalAmout;
}

console.log(addNumber());

// 🔟 Числа від 241 до 1
// ✏️ Використай цикл, щоб створити масив з числами у зворотному порядку від 241 до 1.

function reverseArr() {
  let arr: number[] = [];
  for (let i = 1; i <= 241; i++) {
    arr.push(i);
  }
  return arr.reverse();
}

console.log(reverseArr());

// 1️⃣ 1️⃣ Максимальне число з двох
// ✏️ Напиши програму, яка знаходить найбільше ціле число з двох. Використай if для порівняння.

// maxNumber(10, 20); // Вивід: 20
// maxNumber(5, 5); // Вивід: Обидва числа рівні
// maxNumber(-10, 0); // Вивід: 0

function maxNumber(num1, num2) {
  if (num1 > num2) {
    return num1;
  } else if (num2 > num1) {
    return num2;
  } else {
    const result = "numbers are equal";
    return result;
  }
}

console.log(maxNumber(-10, 0));
