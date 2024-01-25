import Express from 'express';

import { db } from '../repository/connection_db.js';
import AccountController from '../controller/account_controller.js';
import AccountService from '../service/account_service.js';
import AccountRepository from '../repository/account_repository.js';

const router = Express.Router();

const accountRepository = new AccountRepository(db);
const accountService = new AccountService(accountRepository);
const accountController = new AccountController(accountService);

router.get('/', accountController.showLoginPage.bind(accountController));
router.get('/signup', accountController.showSignupPage.bind(accountController));
router.post('/signup', accountController.signup.bind(accountController));
router.post('/login', accountController.login.bind(accountController));
router.get('/logout', accountController.logout.bind(accountController));

export default router;
