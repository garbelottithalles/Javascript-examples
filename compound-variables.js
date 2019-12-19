var date = new Date()
var hour = []
var alarm = 7

console.log (`Alarms: ${alarm}.`)

hour.push(date.getHours())
console.log (`Time: ${hour[0]}: ${date.getMinutes()}, Length: ${hour.length}`)

for(let i in hour){
    console.log(`Position: ${i}, value: ${hour[i]}`)
}
var position = hour.indexOf(1)
if(position == -1){
    console.log("Not found!")
}
else{
    console.log`Value position = ${position}`
}
