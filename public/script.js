function load(){
 msg = window.document.getElementById('msg')
 img = window.document.getElementById('img')
 date = new Date()
 hour = date.getHours()
 minutes = date.getMinutes()

  if (minutes < 10){
    msg.innerHTML =`${hour}:0${minutes}`
  }
  else{
  msg.innerHTML =`${hour}:${minutes}`
  }

  if(hour > 0 && hour < 18){
    if(hour <12){
    img.src = 'public/img/manha.png'
    document.body.style.background = '#e2cd9f'
    }
    if(hora > 12){
    img.src = 'public/img/tarde.png'
    document.body.style.background = 'orange'
    }
  }
  else{
    img.src = 'public/img/noite.png'
    document.body.style.background = 'black'
  }
}
