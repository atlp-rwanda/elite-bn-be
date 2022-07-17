// setTimeout(() => {

const chatForm = document.getElementById('chat-form');
const input = document.getElementById('msg');
const roomName = document.getElementById('room');
const userList = document.getElementById('users');
const typing = document.getElementById('typing');
const send = document.querySelector('send');
const chatMessages = document.querySelector('.chat-messages');
const leaveRoom = document.querySelector('#leave-room');
//     loadMessages();

// }, 1000);
let token = localStorage.getItem('accessToken');
if (!token) location.href = '/chats/';
const socket = io({
  auth: {
    token,
  },
});
leaveRoom.addEventListener('click', (e) => {
  e.preventDefault();
  socket.disconnect();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('roomName');
  location.href = '/chats/';
});
const loadMessages = () => {
  socket.emit('joinRoom', { room: localStorage.getItem('roomName') });

  socket.on('roomUsers', ({ room, users }) => {
    console.log(users);
    outputRoomName(room);
    outputUsers(users);
  });

  socket.on('message', (message) => {
    console.log(message);
    outPutMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('chatMessage', { room: localStorage.getItem('roomName'), msg: input.value });
    input.value = '';
  });

  function timeoutFunction() {
    socket.emit('typing', false);
  }

  chatForm.addEventListener('keypress', () => {
    socket.emit('typing', { room: localStorage.getItem('roomName') });
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 3000);
  });

  socket.on('typing', (user) => {
    if (user) {
      typing.innerHTML = `
        ${user} is typing ...
        `;
    } else {
      typing.innerHTML = '';
    }
  });

  function outPutMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML += `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text"> ${message.text}</p>`;
    document.querySelector('.chat-messages').appendChild(div);
  }

  //add room name to DOM
  function outputRoomName(room) {
    roomName.innerText = room;
  }

  //add user to dom
  function outputUsers(users) {
    userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join('')}
    `;
  }
};
loadMessages();
