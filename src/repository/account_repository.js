class AccountRepository {
  constructor(db) {
    this.db = db;
  }

  async createUser(userId, password) {
    await this.db.User.create({
      userId,
      password,
    });
  }

  async login(userId, password) {
    const user = await this.db.User.findOne({
      attributes: ['userId'],
      where: {
        userId,
        password,
      },
    });
    if (user) return user.dataValues;
    else return false;
  }
}

export default AccountRepository;
