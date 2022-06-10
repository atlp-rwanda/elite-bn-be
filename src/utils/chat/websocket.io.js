import socketio from 'socket.io';
import formatMessage from './message';
import { decodeAccessToken } from '../helpers/generateToken';
import { addMessage, findById, getAllChats } from '../../services/userServices';
import { leaveRoom, getUserRoom, joinRoom } from './users';
const io = socketio();

io.use(async (socket, next) => {
  const { token } = socket.handshake.auth;
  console.log(`token is ${token}`);
  if (token) {
    const currentUser = await decodeAccessToken(token);
    if (currentUser) {
      const user = await findById(currentUser.id);
      socket.user = user;
      return next();
    }
    return next(new Error('You are not logged in!'));
  }
});

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ room }) => {
    socket.join(room);
    joinRoom(room, socket);
    console.log(getUserRoom(room));
    socket.emit('message', formatMessage(room, `Welcome to ${room}`));
    socket.broadcast
      .to(room)
      .emit('message', formatMessage(room, `${socket.user.username} has joined the chat`));
  });

  socket.on('chatMessage', ({ room, msg }) => {
    io.to(room).emit('message', formatMessage(socket.user.username, msg));

    // const message = await addMessage({
    //  userId:"684e7d05-8572-499b-be8b-96c6ea89c8c9",
    //   message: msg
    // });
    // console.log(message);
  });

  //  socket.on('typing', ({room}) => {
  // socket.broadcast.to(room).emit('typing', formatMessage(room,`${socket.user.username} is typing`));

  //})
  //socket.on("disconnecting", () => {
  // console.log(socket.rooms); // the Set contains at least the socket ID
  //});

  //socket.on("disconnect", () => {
  // socket.rooms.size === 0
  //});
  // //runs when the user disconnecr
  // socket.on('disconnect',()=>{
  //     const user=leaveRoom(socket)
  //         io.to(user.room).emit('message', formatMessage(user.room,`${user.email} has left the chat`));

  //          //send users and room info
  //   io.to(user.room).emit('roomUsers',{
  //     room :user.room,
  //     users: getRoomUsers(user.room)
  //   })

  //     }
  // })
});

export default io;
