class FriendController {
  constructor(friendService) {
    this.friendService = friendService;
  }

  async showFriendPage(req, res) {
    const userId = req.session.userId;
    if (userId) {
      const userList = await this.friendService.getFriendList(userId);
      res.render('friends.ejs', { userList });
    } else {
      res.redirect('/');
    }
  }

  async showFriendRequestPage(req, res) {
    const userId = req.session.userId;
    if (userId) {
      const userList = await this.friendService.getFriendRequestList(userId);
      res.render('friendrequest.ejs', { userList });
    } else {
      res.redirect('/');
    }
  }

  async showDMPage(req, res) {
    const userId = req.session.userId;
    const targetUserId = req.params.userId;
    const DMroomName = await this.friendService.getDMroomName(userId, targetUserId);
    res.render('DM.ejs', { DMroomName, userId, targetUserId });
  }

  async acceptFriendRequest(req, res) {
    const userId = req.session.userId;
    const targetUserId = req.params.userId;
    await this.friendService.acceptFriendLogic(userId, targetUserId);
    res.write("<script>alert('Accept Friend Request Success.')</script>");
    res.write("<script>window.location='/friends/request'</script>");
  }

  async refuseFriendRequest(req, res) {
    const userId = req.session.userId;
    const targetUserId = req.params.userId;
    await this.friendService.refuseFriendLogic(userId, targetUserId);
    res.write("<script>alert('Refuse Friend Request Success.')</script>");
    res.write("<script>window.location='/friends/request'</script>");
  }

  async deleteFriends(req, res) {
    const userId = req.session.userId;
    const targetUserId = req.params.userId;
    await this.friendService.deleteFriendLogic(userId, targetUserId);
    res.write("<script>alert('Delete Friend Success.')</script>");
    res.write("<script>window.location='/friends'</script>");
  }
}

export default FriendController;
