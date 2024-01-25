class FriendRepository {
  constructor(db) {
    this.db = db;
  }

  async selectFriendList(userId) {
    const result = await this.db.Friend.findAll({
      attributes: ['friendUserId'], // Friends 테이블에서 friendUserId 선택
      include: [
        {
          model: this.db.User,
          as: 'user',
          attributes: ['createdAt'], // Users 테이블에서 createdAt 선택
          required: false, // LEFT OUTER JOIN
        },
      ],
      where: {
        userId, // Friends.userId가 'test'인 레코드 필터링
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
    const requestFriendUserList = await this.db.FriendRequest.findAll({
      attributes: ['userId'], // FriendRequests 테이블에서 userId 선택
      include: [
        {
          model: this.db.User,
          as: 'user',
          attributes: ['createdAt'], // Users 테이블에서 createdAt 선택
          required: false, // LEFT OUTER JOIN
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
