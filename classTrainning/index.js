class Car {
    constructor(make, model, doors=4){
        this.make = make
        this.model = model
        this.doors = doors
    }

    makeNoise(){
        console.log('general noise')
    }

    describe(){
        return this.make + ' ' + this.model + ' ' + this.doors
    }
}

class Motorcycle extends Car {
    constructor(make, model, doors, cc){
        super(make, model, doors) //pass parameters to superClass constructor
        this.cc = cc
    }

    describe(){
        return super.describe() + ' ' + this.cc //calls superClass describe function
    }

    makeNoise(){ //override superClass makeNoise function
        console.log('motorcycle noise')
    }

}

let myCar = new Car(make = "Ford", model="Ka", doors=2)
//myCar.describe()

let myMotorCycle = new Motorcycle(make="Yamaha", model="Ninja", doors=0, cc=600)
//console.log(myMotorCycle)
console.log(myMotorCycle.describe())

myMotorCycle.makeNoise()
