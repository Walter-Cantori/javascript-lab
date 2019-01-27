const _ = require('lodash')

//Arrays

// const originalArr = ['a', 'b', 'c', 'd']
//const copyArr = originalArr //only copies the reference and not the values
//const copyArr = originalArr.slice() //shallow copy
//const copyArr = [...originalArr]  //shallow copy using spread
// const copyArr = _.clone(originalArr)  //shallow copy using lodash

// console.log('originalArr', originalArr)
// console.log('copyArr', copyArr)


// console.log('****changing copy*****')
// copyArr[0] = 'Z'

// console.log('originalArr', originalArr)
// console.log('copyArr', copyArr)



//Objs
// const originalObj = {
//     a: 1,
//     b: 2
// }

//const copyObj = originalObj //only copies the reference and not the values
//const copyObj = Object.assign({}, originalObj) //shallow copy
//const copyObj = {...originalObj} //shallow copy with spread operator
//const copyObj = _.clone(originalObj) //shallow copy with loadash operator

// console.log('originalObj', originalObj)
// console.log('copyObj', copyObj)

// console.log('****changing copy*****')
// copyObj['a'] = 10

// console.log('originalObj', originalObj)
// console.log('copyObj', copyObj)


// Array of Objs

// const originalObj = [
//     { a: 1, b: 2 },
//     { c: 3, d: 4 },
// ]
// //const copyObj = []
// //const copyObj = originalObj //only copies the reference and not the values

// // originalObj.forEach(el =>{
// //      copyObj.push(Object.assign({}, el))
// //  }) //deep copy

// // originalObj.forEach(el =>{
// //     copyObj.push({...el})
// // }) //deep copy spread

// const copyObj = _.cloneDeep(originalObj) //deep copy with lodash

// const copyObj = JSON.parse(JSON.stringify(originalObj));

// console.log('originalObj', originalObj)
// console.log('copyObj', copyObj)

// console.log('****changing copy*****')
// copyObj[0]['a'] = 10

// console.log('originalObj', originalObj)
// console.log('copyObj', copyObj)


//nested arrays
// const originalArr = ['a', 'b', 'c', 'd', ['x', 'y']]
//const copyArr = _.cloneDeep(originalArr) //deep copy with lodash
//const copyArr = JSON.parse(JSON.stringify(originalArr));

// console.log('originalArr', originalArr)
// console.log('copyArr', copyArr)


// console.log('****changing copy*****')
// copyArr[4][0] = 'Z'

// console.log('originalArr', originalArr)
// console.log('copyArr', copyArr)
