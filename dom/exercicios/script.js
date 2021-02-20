alert("bem vindo!!")
function load(){
  var msg = window.document.getElementById('msg')
  var img = window.document.getElementById('img')
  var data = new Date()
  var hora = data.getHours()
  var minutos = data.getMinutes()

  if (minutos < 10){
    msg.innerHTML =`${hora}:0${minutos}`
  }
  else{
  msg.innerHTML =`${hora}:${minutos}`
  }

  if(hora > 0 && hora < 18){
    if(hora <12){
    img.src = 'imagens/manha.png'
    document.body.style.background = '#e2cd9f'
  }
  if(hora > 12){
    img.src = 'imagens/tarde.png'
    document.body.style.background = 'orange'
  }
  }
  else{
    img.src = 'imagens/noite.png'
    document.body.style.background = 'black'
  }



}
