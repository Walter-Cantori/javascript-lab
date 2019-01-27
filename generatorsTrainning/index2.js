function* makeGen(){
    yield getX()
    yield getY()
}


function getX(){
    res = 0;
    for(let i = 0; i < 100; i++){
        res += i
    }
    return res
}

function getY(x=10){
    let res = 0
    for(let i = 0; i < x; i++){
        res += i
    }
    return(res)

}

var result = makeGen()

let control = true
while (control) {
    res = result.next()
    console.log(res.value)
    control = !res.done
    
}


