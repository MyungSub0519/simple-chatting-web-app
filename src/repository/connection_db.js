import { Sequelize } from 'sequelize';
import { User, Friend, FriendRequest } from './model/DB_model.js';
import dotenv from 'dotenv';

dotenv.config();

const db = {};
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: parseInt(process.env.DB_PORT),
});

db.sequelize = sequelize;

db.User = User;
db.Friend = Friend;
db.FriendRequest = FriendRequest;

User.init(sequelize);
Friend.init(sequelize);
FriendRequest.init(sequelize);

User.associate({ Friend, FriendRequest });
Friend.associate({ User });
FriendRequest.associate({ User });

sequelize
  .sync()
  .then(() => {
    console.log('Database Connect success');
  })
  .catch((err) => {
    console.error('Database Connect fail:', err);
  });

export { db, sequelize };
