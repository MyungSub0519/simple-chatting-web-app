class AccountService {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

  async signupLogic(userId, password) {
    await this.accountRepository.createUser(userId, password);
  }

  async loginLogic(userId, password) {
    const result = await this.accountRepository.login(userId, password);
    if (result) return result.userId;
    else return false;
  }
}

export default AccountService;
