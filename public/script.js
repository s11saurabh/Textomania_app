// connection
const socket = io();

let username = prompt("Enter your Name");

//dom access

let textarea = document.querySelector("textarea");
let container = document.querySelector(".container");
let msg = document.querySelector(".msg");
let messageArea = document.querySelector(".message__area");
let sender = document.querySelector(".sender");
let receiver = document.querySelector(".receiver");
// let sender = document.querySelector('.sender');

textarea.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage(event.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    username: username,
    message: message.trim(),
  };
  textarea.value = "";
  socket.emit("chat", msg);
  showMessage(msg, "sender");
  ScrollToBottom();
  console.log("Send message work");
}

socket.on("chat", function (msg) {
  // messageArea.innerHTML += `<div class="msg sender"><h6>${msg.username}</h6> <p>${msg.message}</p></div>`
  showMessage(msg, "receiver");
  ScrollToBottom();
});

function showMessage(msg, type) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("msg", type);
  let markup = `<h6>${msg.username}</h6> <p>${msg.message}</p>`;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

function ScrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
