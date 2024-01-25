import Express from 'express';

import { db } from '../repository/connection_db.js';
import UserController from '../controller/user_controller.js';
import UserService from '../service/user_service.js';
import UserRepository from '../repository/user_repository.js';

const router = Express.Router();

const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get('/', userController.showUsersPage.bind(userController));
router.post('/:userId', userController.reqeustToFriend.bind(userController));

export default router;
