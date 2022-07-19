import express from 'express';
import {
  addNoficationStatus,
  getNotifications,
  getNotificationById,
} from '../controllers/notificationController';
import checkAuth from '../middlewares/checkAuth';
import verifyManager from '../middlewares/managerAuth';

const notificationsRouter = express.Router();
notificationsRouter.post('/v1/notifications/status', checkAuth, addNoficationStatus);
notificationsRouter.get('/v1/notifications', checkAuth, verifyManager, getNotifications);

notificationsRouter.get('/v1/:Id/notifications', checkAuth, getNotificationById);

export default notificationsRouter;
