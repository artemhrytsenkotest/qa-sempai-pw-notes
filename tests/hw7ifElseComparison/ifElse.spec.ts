import { test, expect } from "@playwright/test";
import exp from "constants";

// Парне чи непарне число
// 🔢 Напишіть програму, яка визначає, чи число парне або непарне.
// Вхід: Число (наприклад, 4)
// Вихід:
// "Число парне."
// "Число непарне."

function evenOrNotEven(num) {
  if (num % 2 === 0) {
    return "Even";
  } else {
    return "Not Even"; // add logic for string, because now the function works only with number
  }
}

//function evenOrNotEven can be change to use True or False in return. It makes easier to test this function.

test("even?", async () => {
  const result = evenOrNotEven(2);
  expect(result).toBe("Even");
});

test("not even?", async () => {
  const result = evenOrNotEven(1);
  expect(result).toBe("Not Even");
});

const result = evenOrNotEven(11);
console.log(result);

// 2️⃣ Привітання за часом
// ⏰ Залежно від часу доби, виведіть привітання: "Доброго ранку!", "Доброго дня!" або "Доброго вечора!".
// Вхід: Година (наприклад, 15)
// Вихід:
// Якщо год < 12: "Доброго ранку!"
// Якщо год 12–18: "Доброго дня!"
// Якщо год > 18: "Доброго вечора!"

function sayGreetings(time) {
  if (time >= 0 && time < 12) {
    return "Good morning";
  } else if (time >= 12 && time <= 18) {
    return "Good afternoon";
  } else if (time > 18 && time <= 24) {
    return "Good evening";
  } else {
    return "no such time";
  }
}

test("is morning - min value", async () => {
  const whatTime = sayGreetings(0);
  expect(whatTime).toBe("Good morning");
});

test("is morning - max value", async () => {
  const whatTime = sayGreetings(11.59);
  expect(whatTime).toBe("Good morning");
});

test("is afternoon - max value", async () => {
  const whatTime = sayGreetings(18);
  expect(whatTime).toBe("Good afternoon");
});

test("is afternoon - min value", async () => {
  const whatTime = sayGreetings(12);
  expect(whatTime).toBe("Good afternoon");
});

test("is evening - max value", async () => {
  const whatTime = sayGreetings(24);
  expect(whatTime).toBe("Good afternoon");
});

test("is evening - min value", async () => {
  const whatTime = sayGreetings(18.1);
  expect(whatTime).toBe("Good afternoon");
});

const greetings = sayGreetings(11);
console.log(greetings);

// 3️⃣ Перевірка оцінки
// 📚 Якщо бал >= 50 — "Тест складено". Якщо < 50 — "Тест не складено".

function examResults(point) {
  if (point < 50) {
    return "failed";
  } else {
    return "passed";
  }
}

test("passed - min value", async () => {
  const result = examResults(50);
  expect(result).toBe("passed");
});

test("failed - max value", async () => {
  const result = examResults(49);
  expect(result).toBe("failed");
});

const results = examResults(50);
console.log(results);

// 4️⃣ Вік для голосування
// 🗳 Напишіть програму, яка перевіряє, чи можна користувачу голосувати.
// Вхід: Вік (наприклад, 17)
// Вихід:
// Якщо >= 18: "Ви можете голосувати."
// Інакше: "Ви ще не можете голосувати."

function canVote(age) {
  if (age >= 18) {
    return "can vote";
  } else {
    return "can't vote";
  }
}

test("min age for voting", async () => {
  const age = canVote(18);
  expect(age).toBe("can vote");
});

test("max age when voting isn't allowed", async () => {
  const age = canVote(18);
  expect(age).toBe("can't vote");
});

const age = canVote(6);
console.log(age);

// 5️⃣ Порівняння чисел
// ⚖️ Порівняйте два числа: виведіть більше, або повідомте, що числа рівні.
// Вхід: Два числа (наприклад, 8 і 10)
// Вихід:
// "Перше число більше."
// "Друге число більше."
// "Числа рівні."

function compareNumbers(num1, num2) {
  if (num1 > num2) {
    return num1;
  } else if (num2 > num1) {
    return num2;
  } else return "numbers are equal";
}

test("num1 > num2", async () => {
  const comparisonResult = compareNumbers(10, 9);
  expect(comparisonResult).toBe(10);
});

test("num2 > num1", async () => {
  const comparisonResult = compareNumbers(9, 10);
  expect(comparisonResult).toBe(10);
});

test("num1 = num2", async () => {
  const comparisonResult = compareNumbers(10, 10);
  expect(comparisonResult).toBe("numbers are equal");
});

const comparisonResult = compareNumbers(1122, 1122);
console.log(comparisonResult);

// 6️⃣ Дорога і світлофор
// 🚦 Якщо зелений — переходьте. Жовтий — підготуйтеся. Червоний — зачекайте.

function trafficLights(color) {
  if (color === "green") {
    return "You may walk.";
  } else if (color === "yellow") {
    return "Be ready.";
  } else if (color === "red") {
    return "Wait.";
  }
}

// else if (color === "red") {
//   return "Wait."};

//   or

// else return "Wait.";
test("green signal", async () => {
  const allowedAction = trafficLights("green");
  expect(allowedAction).toBe("You may walk.");
});

test("yellow signal", async () => {
  const allowedAction = trafficLights("yellow");
  expect(allowedAction).toBe("Be ready.");
});

test("red signal", async () => {
  const allowedAction = trafficLights("red");
  expect(allowedAction).toBe("Wait.");
});

const signalColor = trafficLights("red");
console.log(signalColor);

// 7️⃣ Визначення типу числа
// ➕➖ Напишіть програму, яка визначає, чи число додатнє, від’ємне або дорівнює нулю.
// Вхід: Число (наприклад, -5)
// Вихід:
// "Число додатнє."
// "Число від’ємне."
// "Число дорівнює нулю."

function returnsNumberType(num) {
  if (num > 0) {
    return "the numbe is positive";
  } else if (num === 0) {
    return "the number is 0";
  } else return "the number is negative";
}

test("number is positive", async () => {
  const numberResult = returnsNumberType(1);
  expect(numberResult).toBe("the number is positive");
});

test("number is negative", async () => {
  const numberResult = returnsNumberType(-1);
  expect(numberResult).toBe("the number is negative");
});

test("number is 0", async () => {
  const numberResult = returnsNumberType(0);
  expect(numberResult).toBe("the number is 0");
});

const numberType = returnsNumberType(2);
console.log(numberType);
