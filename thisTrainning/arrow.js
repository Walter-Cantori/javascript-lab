this.bar = 5

let testArrow = () => {
    console.log(this.bar)
}

let testfunction = function(){
    console.log(this.bar)
}

testArrow.call({bar: 10}) // 5
testfunction.call({bar: 10}) //10

