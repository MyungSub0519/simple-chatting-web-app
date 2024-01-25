import Express from 'express';

import { db } from '../repository/connection_db.js';
import AccountController from '../controller/account_controller.js';
import AccountService from '../service/account_service.js';
import AccountRepository from '../repository/account_repository.js';

const router = Express.Router();

// Repository에 db를 주입
const accountRepository = new AccountRepository(db);
// Service에 Repository를 주입
const accountService = new AccountService(accountRepository);
// Controller에 Service를 주입
const accountController = new AccountController(accountService);

// 아래는 엔드포인트를 설정하는 코드들입니다.
router.get('/', accountController.showLoginPage.bind(accountController));
router.get('/signup', accountController.showSignupPage.bind(accountController));
router.post('/signup', accountController.signup.bind(accountController));
router.post('/login', accountController.login.bind(accountController));
router.get('/logout', accountController.logout.bind(accountController));

export default router;
