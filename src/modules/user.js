import Express from 'express';

import { db } from '../repository/connection_db.js';
import UserController from '../controller/user_controller.js';
import UserService from '../service/user_service.js';
import UserRepository from '../repository/user_repository.js';

const router = Express.Router();

// Repository에 db를 주입
const userRepository = new UserRepository(db);
// Service에 Repository를 주입
const userService = new UserService(userRepository);
// Controller에 Service를 주입
const userController = new UserController(userService);

router.get('/', userController.showUsersPage.bind(userController));
router.post('/:userId', userController.reqeustToFriend.bind(userController));

export default router;
