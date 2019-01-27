// let obj = {
//     foo: 'bar',
//     showFoo: function(){
//         return this.foo
//     }
// }

// console.log(obj.showFoo()) //foo
// console.log(obj.showFoo.call({foo: "test"})) //test


// let objWithArrow = {
//     foo: 'bar',
//     showFoo: () => {
//         return this.foo
//     }
// }

// console.log(objWithArrow.showFoo()) //undefined
// console.log(objWithArrow.showFoo.call({foo: "test"})) //undefined


//****** Getter and Setter **********/

// let objGetSet = {
//     a: 1,
//     b: 2,
//     c: 3,

//     get sum(){
//         return this.a + this.b + this.c
//     },

//     set newValue(obj){
//         let key = Object.keys(obj)[0]
//         this[key] = obj[key]
//     }
// }

// console.log(objGetSet.sum) //6
// objGetSet.newValue = {a: 10}
// console.log(objGetSet.sum) //15

// console.log(objGetSet.sum.call({a: 10, b:20, c: 30})) //error