let Car = function (make, model, doors){
    this.make = make
    this.model = model
    this.doors = doors

    this.makeNoise = function(){ //this function is not added in Car`s prototype and hence can not be inherited
        console.log('general noise')
    }
}


Car.prototype.describe = function(){  //add method to Car`s prototype
    return this.make + ' ' + this.model + ' ' + this.doors
}

let myCar = new Car(make = 'Ford', model = 'Ka', doors = 2) //create new car instance
myCar.makeNoise()
console.log(myCar.describe())


let Motorcycle = function(make, model, doors, cc){
    Car.call(this, make, model, doors)  //calls car`s constructor to inherit cars properties
    this.cc = cc
}
let moto = new Motorcycle('susuki', 'foo', 0, 750)
console.log('***', moto.make)

console.log('before adding car prototype to motorcycle prototype \n')
console.log(Object.getOwnPropertyNames(Car.prototype))
console.log(Object.getOwnPropertyNames(Motorcycle.prototype))
console.log(Car.prototype.makeNoise)
console.log(Car.prototype.describe)
console.log(Motorcycle.prototype.makeNoise)
console.log(Motorcycle.prototype.describe)

console.log('after adding car prototype to motorcycle prototype \n')
Motorcycle.prototype = Object.create(Car.prototype) //motorcycle will inherit cars prototype methods
Motorcycle.prototype.constructor = Motorcycle //motorcycle prototype will have proper constructor

console.log(Object.getOwnPropertyNames(Car.prototype))
console.log(Object.getOwnPropertyNames(Motorcycle.prototype))
console.log(Car.prototype.makeNoise)
console.log(Car.prototype.describe)
console.log(Motorcycle.prototype.makeNoise)
console.log(Motorcycle.prototype.describe)

let myMotorcycle = new Motorcycle("Yamaha", "Ninja", 0, 250)
console.log(myMotorcycle.describe())
myMotorcycle.makeNoise()

Motorcycle.prototype.describe = function(){  //override cars describe method
    return this.make + ' ' + this.model + ' ' + this.doors + ' ' + this.cc
}

let myMotorCycle2 = new Motorcycle("Honda", "CB", 0, 500)

console.log(myCar.describe())
console.log(myMotorcycle.describe())
console.log(myMotorCycle2.describe())
