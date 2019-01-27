console.log(this) // {}
//console.log(global)
console.log(this == global ) // false
console.log(this === module.exports) // true


bar = 5
console.log(global.bar) //5
console.log(this.bar) // undefined

global.foo = "test"
console.log(foo) // test
console.log(global.foo) // test
console.log(this.foo) // undefined


function printThis(){
    console.log(this.bar)
}

printThis() //5
printThis.call({bar: 'new 5'}) //new 5
a = printThis.bind({bar: 10})
a() //10

printThis.call({bar: 20}) //20
a() //10
a.call({bar: 30}) //10










