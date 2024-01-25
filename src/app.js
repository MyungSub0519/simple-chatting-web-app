import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import methodOverride from 'method-override';
import account from './modules/account.js';
import room from './modules/room.js';
import user from './modules/user.js';
import friend from './modules/friend.js';
import socketchat from './socketchat.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = 3000;

app.set('view engine', 'ejs');

app.use(
  session({
    secure: true,
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      Secure: true,
    },
    name: 'session-cookie',
  }),
);
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('', account);
app.use('/rooms', room);
app.use('/users', user);
app.use('/friends', friend);

socketchat(io);

httpServer.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}/`);
});

export { io };
