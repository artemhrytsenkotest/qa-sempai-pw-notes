const arr = [1, 2, 3, 4, 5];
console.log(arr[3]);

const obj = {
  1: 1,
  2: 21,
  three: 33,
  other: 3,
  "other-33": 36,
};

console.log(obj.three);
console.log(obj["other-33"]);

const student = {
  name: "Artem",
  lastName: "Hrytsenko",
  age: 33,
  city: "Kyiv",
  isMarried: true,
  pets: ["max", "ara"],
  education: [
    { name: "school", earsStudy: "1999-2003" },
    { name: "uni", earsStudy: "2005-2008" },
  ],
  greetings: function () {
    const greet = `Hello my name ${this.name} ${this.lastName}`;
    console.log(greet);
  },
  greetings2: () => {
    console.log("Hi!");
  },
};

student.greetings();
student.greetings2();

//new
// const obj2 = new Object();
// obj2.myFirstKey = "testKey";
// obj2['mu2key']='test2'
// console.log(obj2);
