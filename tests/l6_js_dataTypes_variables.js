//typeof - returns data type

const { type } = require("os");

console.log(typeof "123")
console.log(typeof 123)

//number
const num = 20791;
const nym = 1_000; // _ is used as separator
const pi = 3.14;
const minusPi = -3.14;
console.log(nym)
console.log(10/0) // Infinity
console.log('a'  * 2); //NaN

//string
const str1 = 'artem'
const str2 = "artem"
const str3 = ` "" '' `
console.log(` 123"" a \nsd'' `)

//string templating
const str4 = "artem"
const str5 = ` "" ${str4} '' `
console.log(str5)


//boolean

let isTrue = true;
let ifFalse = false;


//undefined 
console.log(typeof(undefined))

//null
let n = null;
console.log(typeof(n));

//symbol
let sym = Symbol('some description');
console.log(sym);
console.log(typeof(sym));

//BigInt
let someBigInt = 123123123123123123123123123n;
let someBigNumber= 1231231231231233123123123;

console.log(someBigInt)
console.log(typeof someBigInt)

//object
const obj = {x: '123', y: "artem", z: 1}
const some = obj

obj.x = 'changed'

console.log(obj)
console.log(some)

//array
const someArray = [1, 2, 3, "artem"]
console.log(someArray[3])

console.log(1 + true)
console.log(1 + "artem")
console.log('some string' + false)

// variables

//var - old way to declare a variable
//let - new option to declare a variable
//const - constant variables 

var name1 = 'artem'
var name1 = 'artem'

//let name = 'artem';
//let name = 'artem';

//const constName = 'artem'
//const constName = 'artem2'

//visibility scope
//Global vs Block vs Functional vs Lexical

if(true) {
    //block
    let someBlockVariable = 123;
    console.log(someBlockVariable)
}

//console.log(someBlockVariable)


//functional

function fizz() {
    let someVariable = 'some value';
    console.log(someVariable)
};

console.log(someVariable);

//hoisting

//naming styles
camelCase - used in JS
PascalCase - used in JS for classes and constructors 
snake_case - not used in JS
kebab-case - might be used in file names
UPPER_CASE - global const variables, env variables
//hungarian notation - not used at all