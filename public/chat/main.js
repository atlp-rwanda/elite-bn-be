const chatForm = document.getElementById('chat-form');
const input = document.getElementById('msg');
const roomName = document.getElementById('room');
const userList = document.getElementById('users');
const typing = document.getElementById('typing');
const send = document.querySelector('send');
const chatMessages = document.querySelector('.chat-messages');

let token = localStorage.getItem('accessToken');
if (token) location.href = '/chats/chat.html';
// get username and room from url
const loginForm = document.getElementById('login-form');
console.log(loginForm);
loginForm &&
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const signIn = async () => {
      localStorage.removeItem('accessToken');
      const data = {
        email,
        password,
      };
      const response = await fetch('http://localhost:3000/api/v1/user/login', {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        token = result.token;

        localStorage.setItem('accessToken', token);
        localStorage.setItem('roomName', roomName.value);
        location.href = '/chats/chat.html';
      } else {
        alert('invalid credential,Try again');
        console.log('error,');

        return false;
      }
    };
    signIn();
  });
