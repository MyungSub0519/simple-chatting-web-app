import { Sequelize } from 'sequelize';

class User extends Sequelize.Model {
  static init(db) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
          allowNull: false,
          primaryKey: true,
        },
        password: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize: db,
        modelName: 'User',
        tableName: 'Users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(models) {
    // User와 FriendRequest 관계
    this.hasMany(models.FriendRequest, { foreignKey: 'userId', as: 'friendRequests' });

    // User와 Friend 관계
    this.hasMany(models.Friend, { foreignKey: 'userId', as: 'friends' });
  }
}

class Friend extends Sequelize.Model {
  static init(db) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
        },
        friendUserId: {
          type: Sequelize.STRING(20),
        },
        DMroomName: {
          type: Sequelize.STRING(40),
        },
      },
      {
        sequelize: db,
        timestamps: false,
        modelName: 'Friend',
        tableName: 'Friends',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        id: false,
      },
    );
  }

  static associate(models) {
    // Friend와 User 관계
    this.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'userId', as: 'user' });
  }
}

class FriendRequest extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
        },
        targetUserId: {
          type: Sequelize.STRING(20),
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'FriendRequest',
        tableName: 'FriendRequests',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(models) {
    // FriendRequest와 User 관계
    this.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'userId', as: 'user' });
  }
}

export { User, Friend, FriendRequest };
