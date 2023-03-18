const wsUrl = "wss://echo-ws-service.herokuapp.com";

function pageLoaded() {
  const infoOutput = document.querySelector(".info_output");
  const chatOutput = document.querySelector(".chat_output");
  const input = document.querySelector("input");
  const sendBtn = document.querySelector(".btn_send");
  const btn = document.querySelector(".j-btn-test");
  const deleteMessages = document.querySelector(".delete-messages");

  let socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  };
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  };

  socket.onerror = () => {
    infoOutput.innerText = "При передачи данных произошла ошибка";
  };

  sendBtn.addEventListener("click", sendMessage);

  function sendMessage() {
    if (input.value === "") return;
    socket.send(`Сервер:  ${input.value}`);
    writeToChat(input.value, false);
    input.value = "";
    console.log(input.value);
  }
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${
      isRecieved ? "recieved" : "sent"
    }">${message}</div}`;
    chatOutput.innerHTML += messageHTML;
  }

  const success = (position) => {
    console.log("position", position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let mapLink = `
  <a href='https://www.openstreetmap.org/#map=18/${latitude}/${longitude}'>Ваше местоположение</a>
  `;
    writeToChat(mapLink, false);
  };
  const error = () => {
    infoOutput.textContent = "Невозможно получить ваше местоположение";
  };

  btn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      infoOutput.textContent = "Geolocation не поддерживается вашим браузером";
    } else {
      infoOutput.textContent = "Определение местоположения…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });

  deleteMessages.addEventListener("click", () => {
    chatOutput.innerHTML = " ";
  });
}

document.addEventListener("DOMContentLoaded", pageLoaded);