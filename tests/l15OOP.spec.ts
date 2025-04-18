const car = {
  color: "red", // властивість
  size: "small",
  wheelsNumber: 4,
  maxSpeed: 100,
  minSpeed: 0,
  isAutomatic: true,
  series: "sport",
  startEngine: () => {
    console.log("Rarrrr");
  }, // метод
  drive: () => {
    "Car is moving";
  },
  driveAtMaxSpeed: function () {
    console.log(`My max speed is ${this.maxSpeed}`);
  },
};

console.log(car.color);

car.driveAtMaxSpeed();

//car class

class Car {
  color: string;
  size: string = "small";
  wheelsNumber: number = 4;
  maxSpeed: number = 100;
  minSpeed: number = 0;
  isAutomatic: boolean = true;
  series: string = "sport";

  constructor(color: string) {
    this.color = color;
  }

  startEngine() {
    console.log("Rarrrr");
  }

  drive() {
    "Car is moving";
  }

  driveAtMaxSpeed() {
    console.log(`My max speed is ${this.maxSpeed}`);
  }
}

const yellowCar = new Car("red");
const yellowCar2 = new Car("green");
console.log(yellowCar.color);
console.log(yellowCar2.color);

//
