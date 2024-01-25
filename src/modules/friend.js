import Express from 'express';

import { db } from '../repository/connection_db.js';

import FriendController from '../controller/friend_controller.js';
import FriendService from '../service/friend_service.js';
import FriendRepository from '../repository/friend_repository.js';

const router = Express.Router();

const friendRepository = new FriendRepository(db);
const friendService = new FriendService(friendRepository);
const friendController = new FriendController(friendService);

router.get('/', friendController.showFriendPage.bind(friendController));
router.get('/request', friendController.showFriendRequestPage.bind(friendController));
router.get('/:userId', friendController.showDMPage.bind(friendController));
router.delete('/:userId', friendController.deleteFriends.bind(friendController));
router.post('/request/:userId/accept', friendController.acceptFriendRequest.bind(friendController));
router.delete('/request/:userId/refuse', friendController.refuseFriendRequest.bind(friendController));

export default router;
