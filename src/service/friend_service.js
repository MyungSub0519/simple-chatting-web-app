import { formatDate } from '../lib/utlis.js';

class FriendService {
  constructor(friendRepository) {
    this.friendRepository = friendRepository;
  }

  async getFriendList(userId) {
    const result = await this.friendRepository.selectFriendList(userId);
    const formattedResult = result.map((user) => ({
      ...user,
      createdAt: formatDate(user.createdAt),
    }));
    return formattedResult;
  }

  async getFriendRequestList(userId) {
    const result = await this.friendRepository.selectFriendRequestList(userId);
    const formattedResult = result.map((user) => ({
      ...user,
      createdAt: formatDate(user.createdAt),
    }));
    return formattedResult;
  }

  async getDMroomName(userId, targetUserId) {
    const result = await this.friendRepository.selectDMroomName(userId, targetUserId);
    return result.DMroomName;
  }

  async acceptFriendLogic(userId, targetUserId) {
    await this.friendRepository.deleteByTargetUserId(userId, targetUserId);
    await this.friendRepository.createFriend(userId, targetUserId);
  }

  async refuseFriendLogic(userId, targetUserId) {
    await this.friendRepository.deleteByTargetUserId(userId, targetUserId);
  }

  async deleteFriendLogic(userId, targetUserId) {
    await this.friendRepository.deleteFriend(userId, targetUserId);
  }
}

export default FriendService;
