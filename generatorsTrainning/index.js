async function makeGen(){
    try{
        let x = await getX()
        let y = await getY(x)
        return y
    } catch(err){
        throw new Error('error on x');
    }
}


function getX(){
    return new Promise((resolve, reject) => {
        res = 0;
        for(let i = 0; i < 100; i++){
            res += i
        }
        //throw new Error('error on x');
        reject('error on x')
    })
}

function getY(x){
    let res = 0
    for(let i = 0; i < x; i++){
        res += i
    }
    return res

}

makeGen().then( res => {
    console.log(`on success ${res}`)
}).catch( err => {
    console.log(`on error ${err}`)
})
