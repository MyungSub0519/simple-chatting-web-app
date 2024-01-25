class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async selectAllUser() {
    const result = await this.db.User.findAll({ attributes: ['userId', 'createdAt'] });
    const userList = result.map((user) => {
      return {
        userId: user.dataValues.userId,
        createdAt: user.dataValues.createdAt,
      };
    });
    return userList;
  }

  async insertFriendReqeust(userId, targetUserId) {
    await this.db.FriendRequest.create({
      userId,
      targetUserId,
    });
  }
}

export default UserRepository;
