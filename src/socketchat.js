// chat.js
import cookie from 'cookie';

const room1userList = {};
const room2userList = {};

function socketchat(io, userController) {
  io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('join', (room) => {
      socket.join(room);
      const roomSocket = io.sockets.adapter.rooms.get(room);
      const roomCount = roomSocket ? roomSocket.size : 0;
      const cookies = cookie.parse(socket.request.headers.cookie);
      if (room == 1) {
        room1userList[socket.id] = cookies.userId;
        io.to(room).emit('room member', room1userList);
      } else if (room == 2) {
        room2userList[socket.id] = cookies.userId;
        io.to(room).emit('room member', room2userList);
      }
      io.to(room).emit('count', roomCount);
      io.to(room).emit('join-out message', `${cookies.userId}님이 ${room}번방에 입장하셨습니다.`);
    });

    socket.on('chat message', (msg, room) => {
      const cookies = cookie.parse(socket.request.headers.cookie);
      io.to(room).emit('chat message', msg, cookies.userId);
    });

    socket.on('out', (room) => {
      socket.leave(room);
      const roomSocket = io.sockets.adapter.rooms.get(room);
      const roomCount = roomSocket ? roomSocket.size : 0;
      const cookies = cookie.parse(socket.request.headers.cookie);
      if (room == 1) {
        delete room1userList[socket.id];
        io.to(room).emit('room member', room1userList);
      } else if (room == 2) {
        delete room2userList[socket.id];
        io.to(room).emit('room member', room2userList);
      }
      io.to(room).emit('count', roomCount);
      io.to(room).emit('join-out message', `${cookies.userId}님이 ${room}번방에서 퇴장하셨습니다.`);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}

export default socketchat;
