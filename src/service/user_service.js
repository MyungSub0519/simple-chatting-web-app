import { formatDate } from "../lib/utlis.js";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserList() {
    const result = await this.userRepository.selectAllUser();
    const formattedResult = result.map((user) => ({
      ...user,
      createdAt: formatDate(user.createdAt),
    }));
    return formattedResult;
  }

  async createRequestToFriend(userId, targetUserId) {
    await this.userRepository.insertFriendReqeust(userId, targetUserId);
  }
}



export default UserService;
