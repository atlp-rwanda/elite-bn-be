import socketio from 'socket.io';
import formatMessage from './message';
import { decodeAccessToken } from '../helpers/generateToken';
import { addMessage, findById, getAllChats } from '../../services/userServices';
import { leaveRoom, getUserRoom, joinRoom } from './users';
const io = socketio();

io.use(async (socket, next) => {
  const { token } = socket.handshake.auth;
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
    socket.emit('message', formatMessage(room, `Welcome to ${room}`));
    socket.broadcast
      .to(room)
      .emit('message', formatMessage(room, `${socket.user.username} has joined the chat`));
  });

  socket.on('chatMessage', ({ room, msg }) => {
    io.to(room).emit('message', formatMessage(socket.user.username, msg));

  });
});

export default io;
