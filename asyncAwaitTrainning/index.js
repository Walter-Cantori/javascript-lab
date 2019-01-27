function returnValue(x){
    return new Promise((resolve, reject) => {
        let result = 0
        for(let i = 0; i < x; i++){
            result += i
        }

        resolve(result)
    })
}

function returnAnotherValue(x){
    return new Promise((resolve, reject) => {
        let result = 0
        for(let i = 0; i < x; i++){
            result += i
        }

        resolve(result)
    })
}

function getValue(x){
    return returnValue(x)
        .then(value => {
            return returnAnotherValue(value)
                .then(newValue => {
                    console.log(newValue)
                })
                .catch(e => console.error(e))
        })
        .catch(e =>{
            console.error(e)
        })
}

async function newGetValue(x){
    let value = await returnValue(x)
    let newValue = await returnAnotherValue(value)
    console.log(newValue)
}

newGetValue(10)
console.log('after async')