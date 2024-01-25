// chat.js
import cookie from 'cookie';

const room1userList = {}; // 전역적으로 1번 채팅방의 유저 리스트 객체를 선언했습니다.
const room2userList = {};

function socketchat(io, userController) {
  io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('join', (room) => {
      socket.join(room);

      const roomSocket = io.sockets.adapter.rooms.get(room); // 해당 room에 접속한 socket의 수를 가져옵니다.
      const roomCount = roomSocket ? roomSocket.size : 0; 
      const cookies = cookie.parse(socket.request.headers.cookie);

      // 아래는 채팅방 참여자 목록을 전달하기 위한 코드 입니다.
      if (room == 1) { // room 번호가 1이라면
        room1userList[socket.id] = cookies.userId; // socket.id에 userId를 매핑해서 1번방 유저 리스트 객체에 추가합니다. 
        io.to(room).emit('room member', room1userList); // room member 이벤트로 유저 리스트 객체를 전송합니다.
      } else if (room == 2) {
        room2userList[socket.id] = cookies.userId;
        io.to(room).emit('room member', room2userList);
      }

      io.to(room).emit('count', roomCount); // 해당 룸의 접속자 수를 전달합니다.
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

      // 아래는 채팅방 참여자 목록을 전달하기 위한 코드 입니다.
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
