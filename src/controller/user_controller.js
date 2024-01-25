class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async showUsersPage(req, res) {
    const userId = req.session.userId;
    if (userId) {
      const userList = await this.userService.getUserList();
      return res.render('users.ejs', { userList });
    } else return res.redirect('/');
  }

  async reqeustToFriend(req, res) {
    const targetUserId = req.params.userId;
    const userId = req.session.userId;
    if (targetUserId === userId) {
      res.write("<script>alert('You cant send yourself a friend request.')</script>");
      res.write("<script>window.location='/Users'</script>");
    } else {
      await this.userService.createRequestToFriend(userId, targetUserId);
      res.write("<script>alert('Send a friend request success.')</script>");
      res.write("<script>window.location='/Users'</script>");
    }
  }
}

export default UserController;
