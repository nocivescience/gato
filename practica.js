let caso=4;
let caso1=10
function prueba(){
    caso=3
    caso1=15
}
function prueba2(){
    prueba()
    caso+=6
    caso1+=8
}
prueba2()
console.log(caso, caso1)