
import socketio from 'socket.io'
import formatMessage from './message'
import { decodeAccessToken } from '../helpers/generateToken'
import { addMessage,getAllChats } from '../../services/userServices'
import { userJoin,getCurrentUser,userLeave,getRoomUsers } from './users'
const io=socketio()



// io.use(async (socket, next) => {
//   const { token } = socket.handshake.auth;
//   console.log(`token is ${token}`)
//   if (token) {

//    const currentUser = await decodeAccessToken(token);
//     if (currentUser) {
//       return next();
//     }
//     return next(new Error('You are not logged in!'));
//   }
// });




io.on('connection',(socket)=>{ 
    socket.on('joinRoom',({username,room})=>{
        const user= userJoin(socket.id,username,room)
        socket.join(user.room)


    socket.emit('message', formatMessage(`${user.username}`,`Welcome to ${user.room}`));
    socket.broadcast.to(user.room).emit('message', formatMessage(user.username,`${username} has joined the chat`));

    io.to(user.room).emit('roomUsers',{
      room:user.room,
      users:getRoomUsers(user.room)
    })
      
    })
    
    socket.on('chatMessage',async msg=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username,msg))

        const message = await addMessage({
          userId:"684e7d05-8572-499b-be8b-96c6ea89c8c9",
          message: msg
        });
    
        console.log(message);
      
  
  
    })
    
    socket.on('typing', (msg) => {
      const user = getCurrentUser(socket.id);
      socket.broadcast.to(user.room).emit('typing', msg);

    })  
    
    //runs when the user disconnecr
    socket.on('disconnect',()=>{
        const user=userLeave(socket.id)
        if(user){
            io.to(user.room).emit('message', formatMessage(user.room,`${user.username} has left the chat`));

             //send users and room info
      io.to(user.room).emit('roomUsers',{
        room :user.room,
        users: getRoomUsers(user.room)
      })

        }
    })
    
})


export default io;