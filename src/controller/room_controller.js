import { io } from '../app.js';

class RoomController {
  constructor(roomService) {
    this.roomService = roomService;
  }

  showRoomPage(req, res) {
    const room1Socket = io.sockets.adapter.rooms.get('1');
    const room2Socket = io.sockets.adapter.rooms.get('2');
    const userId = req.session.userId;
    if (userId) {
      res.render('rooms.ejs', {
        room1Count: room1Socket ? room1Socket.size : 0,
        room2Count: room2Socket ? room2Socket.size : 0,
      });
    } else {
      res.redirect('/');
    }
  }

  showChatRoom1Page(req, res) {
    const userId = req.session.userId;
    const room1Socket = io.sockets.adapter.rooms.get('1');
    if (userId) {
      res.render('room1.ejs', { room1Count: room1Socket ? room1Socket.size : 0 });
    } else {
      res.redirect('/');
    }
  }

  showChatRoom2Page(req, res) {
    const userId = req.session.userId;
    if (userId) {
      res.render('room2.ejs');
    } else {
      res.redirect('/');
    }
  }
}

export default RoomController;
