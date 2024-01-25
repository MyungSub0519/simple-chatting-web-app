class AccountController {
  constructor(accountService) {
    this.accountService = accountService;
  }

  showLoginPage(req, res) {
    const userId = req.session.userId;
    if (userId) {
      res.redirect('/rooms');
    } else {
      res.render('index.ejs');
    }
  }

  showSignupPage(req, res) {
    res.render('signup.ejs');
  }

  signup(req, res) {
    const userId = req.body.userid;
    const password = req.body.password;
    this.accountService.signupLogic(userId, password);
    res.redirect('/');
  }

  async login(req, res) {
    const userId = req.body.userid;
    const password = req.body.password;
    const result = await this.accountService.loginLogic(userId, password);
    if (result) {
      req.session.userId = result;
      res.cookie('userId', userId);
      res.redirect('/rooms');
    } else {
      res.write("<script>alert('ID or Password is wrong')</script>");
      res.write("<script>window.location='/'</script>");
    }
  }

  async logout(req, res) {
    if (req.session.userId) {
      await req.session.destroy();
      res.clearCookie('userId');
      res.redirect('/');
    }
  }
}

export default AccountController;
