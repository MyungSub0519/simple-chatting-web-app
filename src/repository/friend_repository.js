class FriendRepository {
  constructor(db) {
    this.db = db;
  }

  async selectFriendList(userId) {
    // SELECT Friends.friendUserId, Users.createdAt
    //   FROM Friends
    //        LEFT OUTER JOIN Users
    //        ON Users.userId = Friends.friendUserId
    //  WHERE Friends.userId = userId;
    const result = await this.db.Friend.findAll({
      attributes: ['friendUserId'],
      include: [
        {
          model: this.db.User,
          as: 'user',
          attributes: ['createdAt'],
          required: false,
        },
      ],
      where: {
        userId,
      },
    });
    const userList = result.map((friend) => {
      return {
        userId: friend.dataValues.friendUserId,
        createdAt: friend.user ? friend.user.dataValues.createdAt : null,
      };
    });
    return userList;
  }

  async selectFriendRequestList(userId) {
    // SELECT FriendRequests.userId, Users.createdAt
    //   FROM FriendRequests
    //        LEFT OUTER JOIN Users
    //        ON Users.userId = FriendRequests.userId
    //  WHERE targetUserId = 'test2';
    const requestFriendUserList = await this.db.FriendRequest.findAll({
      attributes: ['userId'],
      include: [
        {
          model: this.db.User,
          as: 'user',
          attributes: ['createdAt'],
          required: false,
        },
      ],
      where: {
        targetUserId: userId,
      },
    });
    const userList = requestFriendUserList.map((request) => {
      return {
        userId: request.dataValues.userId,
        createdAt: request.user ? request.user.dataValues.createdAt : null,
      };
    });
    return userList;
  }

  async selectDMroomName(userId, targetUserId) {
    const result = await this.db.Friend.findOne({
      attributes: ['DMroomName'],
      where: {
        userId,
        friendUserId: targetUserId,
      },
    });
    const DMroomName = result.dataValues;
    return DMroomName;
  }

  async deleteByTargetUserId(userId, targetUserId) {
    await this.db.FriendRequest.destroy({
      where: { userId: targetUserId, targetUserId: userId },
    });
  }

  async createFriend(userId, targetUserId) {
    await this.db.Friend.create({
      userId,
      friendUserId: targetUserId,
      DMroomName: userId + targetUserId,
    });
    await this.db.Friend.create({
      userId: targetUserId,
      friendUserId: userId,
      DMroomName: userId + targetUserId,
    });
  }

  async deleteFriend(userId, targetUserId) {
    await this.db.Friend.destroy({
      where: { userId, FriendUserId: targetUserId },
    });
    await this.db.Friend.destroy({
      where: { userId: targetUserId, FriendUserId: userId },
    });
  }
}

export default FriendRepository;
