const rooms = {};
export const joinRoom = (room, socket) => {
  if (rooms[room]) rooms[room] = [...rooms[room], { user: socket.user, socketId: socket.id }];
  else rooms[room] = [{ user: socket.user, socketId: socket.id }];
  console.log(rooms);
};
export const leaveRoom = (room, socket) => {
  rooms[room] = rooms[room].filter((usocket) => usocket.socketId != socket.id);
};
export const getUserRoom = (room) =>
  rooms[room].length && rooms[room].map((usocket) => usocket.socketId);
