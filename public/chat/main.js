
const chatForm = document.getElementById('chat-form')
const input = document.getElementById('msg');
const roomName = document.getElementById('room');
const userList = document.getElementById('users')
const typing = document.getElementById('typing');
const send = document.querySelector('send')
const chatMessages = document.querySelector('.chat-messages');


// get username and room from url
const { email, password, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket =io();

let token = '',
    timeout;
const signIn = async () => {
    localStorage.removeItem('accessToken');
    const data = {
        email,
        password
    };
    const response = await fetch('http://localhost:3000/api/v1/user/login', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status === 200) {
        const result = await response.json();
        token = result.token;
    
        localStorage.setItem('accessToken', token);

        socket = io({
        auth: {
            token
        }
    });



    } else {
        alert('invalid credential,Try again');
        console.log('error,');

        return false;
    }
};
signIn();

setTimeout(() => {
  
   
    loadMessages();
}, 1000);


const loadMessages = () => {
    token = localStorage.getItem('accessToken')
    // socket.auth={accessToken:token}
    // const socket = io({
    //     auth: {
    //         token
    //     }
    // });



    //join chat room
   // const username=email
    socket.emit('joinRoom', {email, room })

    socket.on('roomUsers', ({ room, users }) => {
        console.log(users)
        outputRoomName(room)
        outputUsers(users)

    })


    socket.on('message', message => {
        console.log(message)
        outPutMessage(message)
        chatMessages.scrollTop = chatMessages.scrollHeight;

    })



    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('chatMessage', input.value);
        input.value = '';

    })

    function timeoutFunction() {
        socket.emit("typing", false);
    }


    chatForm.addEventListener('keypress', () => {
        socket.emit('typing', email)
        clearTimeout(timeout)
        timeout = setTimeout(timeoutFunction, 3000)

    })


    socket.on('typing', (user) => {
        if (user) {
            typing.innerHTML = `
        ${user} is typing ...
        `
        }
        else {
            typing.innerHTML = '';
        }

    })

    function outPutMessage(message) {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML += `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text"> ${message.text}</p>`
        document.querySelector('.chat-messages').appendChild(div)

    }

    //add room name to DOM
    function outputRoomName(room) {
        roomName.innerText = room
    }

    //add user to dom
    function outputUsers(users) {
        userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
    }



}
