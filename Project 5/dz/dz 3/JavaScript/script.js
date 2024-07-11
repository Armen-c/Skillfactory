const wsUrl = 'wss://echo-ws-service.herokuapp.com';

const btnOne = document.querySelector('.btn-one');
const btnTwo = document.querySelector('.btn-two');
const input = document.querySelector('.inp')
const dialogBox = document.querySelector('.dialog-box');

function userMessage() {
  if(input.value != '') {
    input.value > 0;
    let userText = document.createElement('p');
    userText.classList.add('userMessage');
    userText.innerText = input.value;
    userText.innerText = 'Сообщение пользователя';
    dialogBox.appendChild(userText);
    input.value = '';
  }
}

let websocket;

btnOne.addEventListener('click', () => {
  if(input.value != '') {
    userMessage();
  
  websocket = new WebSocket(wsUrl);

  websocket.onopen = function() {
    let serverText = document.createElement('p');
    serverText.classList.add('serverText');
    serverText.innerText = 'Сообщение от сервера';
    dialogBox.appendChild(serverText)
  }
  }
})

btnTwo.addEventListener('click', () => {
  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude)
      let link = document.createElement('a');
      link.classList.add('link');
      link.href = `https://www.openstreetmap.org/#map=16/${latitude}/${longitude}`;
      link.textContent = 'Гео-локация';
      dialogBox.appendChild(link);
    })
  }
})

