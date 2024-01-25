import Express from 'express';

import { db } from '../repository/connection_db.js';

import FriendController from '../controller/friend_controller.js';
import FriendService from '../service/friend_service.js';
import FriendRepository from '../repository/friend_repository.js';

const router = Express.Router();

// Repository에 db를 주입
const friendRepository = new FriendRepository(db);
// Service에 Repository를 주입
const friendService = new FriendService(friendRepository);
// Controller에 Service를 주입
const friendController = new FriendController(friendService);

// 아래는 엔드포인트를 설정하는 코드들입니다.
router.get('/', friendController.showFriendPage.bind(friendController));
router.get('/request', friendController.showFriendRequestPage.bind(friendController));
router.get('/:userId', friendController.showDMPage.bind(friendController));
router.delete('/:userId', friendController.deleteFriends.bind(friendController));
router.post('/request/:userId/accept', friendController.acceptFriendRequest.bind(friendController));
router.delete('/request/:userId/refuse', friendController.refuseFriendRequest.bind(friendController));

export default router;
