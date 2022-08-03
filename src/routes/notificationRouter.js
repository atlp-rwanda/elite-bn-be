import express from 'express';
import {
  addNoficationStatus,
  getNotifications,
  getNotificationById,
  readAllNotifications,
  readNotification
} from '../controllers/notificationController';
import checkAuth from '../middlewares/checkAuth';
import verifyManager from '../middlewares/managerAuth';

const notificationsRouter = express.Router();
notificationsRouter.post('/v1/notifications/status', checkAuth, addNoficationStatus);
notificationsRouter.get('/v1/notifications', checkAuth, verifyManager, getNotifications);

notificationsRouter.get('/v1/:Id/notifications', checkAuth, getNotificationById);
notificationsRouter.post(
  '/v1/:Id/read/notifications',
  checkAuth,
  readNotification
);

notificationsRouter.post(
  '/v1/read/notifications',
  checkAuth,
  readAllNotifications
);
export default notificationsRouter;
