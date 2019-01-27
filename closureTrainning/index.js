function counter(){
    let count = 0

    return {
        decrement: function(){
            count--
        },

        increment: function(){
            count++ 
        },

        show: function(){
            return count
        }
    }
}

let count1 = counter()
console.log(count1.show())
count1.increment()
count1.increment()
count1.decrement()
count1.increment()
console.log(count1.show())

let count2 = counter()
console.log(count2.show())

function counterObj(){
    this.count = 0

    this.increment = function(){
        this.count++
    }

    this.show = function(){
        return this.count
    }
}

let co1 = new counterObj()
//co1.increment()

console.log(co1.show())