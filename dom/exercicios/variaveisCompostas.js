let data = new Date()
let hora = [5, 7, 9, data.getHours()]

console.log (`Alarmes: ${hora}.`)
console.log (`${hora[3]}: ${data.getMinutes()}`)
hora.push(11)
console.log(`${hora[4]}`)
console.log(hora.length)


for(let i in hora){
    console.log(`Posição: ${i}, valor: ${hora[i]}`)
}
var posicao = hora.indexOf(1)
if(posicao == -1){
    console.log("Hora não encontrada!")
}
else{
    console.log`O valor esta na posição = ${posicao}`
}
