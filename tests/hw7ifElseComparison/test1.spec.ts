import { test, expect } from "@playwright/test";
import exp from "constants";

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
  expect(whatTime).toBe("Good evening");
});

test("is evening - min value", async () => {
  const whatTime = sayGreetings(18.1);
  expect(whatTime).toBe("Good evening");
});

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

function canVote(age) {
  if (age >= 18) {
    return "can vote";
  } else {
    return "can't vote";
  }
}

const age = canVote(6);
console.log(age);

test("min age for voting", async () => {
  const age = canVote(18);
  expect(age).toBe("can vote");
});

test("max age when voting isn't allowed", async () => {
  const age = canVote(17);
  expect(age).toBe("can't vote");
});

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

function trafficLights(color) {
  if (color === "green") {
    return "You may walk.";
  } else if (color === "yellow") {
    return "Be ready.";
  } else if (color === "red") {
    return "Wait.";
  }
}

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

function returnsNumberType(num) {
  if (num > 0) {
    return "the number is positive";
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
