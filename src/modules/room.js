import Express from 'express';
import RoomController from '../controller/room_controller.js';

const router = Express.Router();

const roomController = new RoomController();

router.get('/', roomController.showRoomPage.bind(roomController));
router.get('/1', roomController.showChatRoom1Page.bind(roomController));
router.get('/2', roomController.showChatRoom2Page.bind(roomController));

export default router;
