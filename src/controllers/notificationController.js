import {
  addNotificationsStatus,
  allNotifications,
  checkIfBlocked,
  getById,
  markNotification
} from '../services/notificationService';
import { internalServerError, notFoundError } from '../utils/errors/applicatioErrors';
import { successResponse } from '../utils/response';

export const addNoficationStatus = async (req, res) => {
  try {
    const { type, status } = req.body;
    const notification = {
      userId: req.user.id,
      type,
      isAllowed: status,
    };

    await addNotificationsStatus(notification);
    successResponse(res, 200, 'Notification status updated');
  } catch (error) {
    return internalServerError({ data: { message: `Error: ${error} ,try again!`, res } }, res);
  }
};
export const getNotifications = async (req, res) => {
  try {
    const checkBlocked = await checkIfBlocked({
      userId: req.user.id,
      type: 'application',
      isAllowed: false,
    });
    if (checkBlocked) {
      return res.status(404).json({ message: 'please enable notification' });
    }
    const notifications = await allNotifications(req.user.id);
    successResponse(res, 200, 'Notifications', notifications);
  } catch (error) {
    return internalServerError({ data: { message: `Error: ${error} ,try again!`, res } }, res);
  }
};
export const getNotificationById = async (req, res) => {
  try {
    const notification = await getById(req.params.Id);
    if (notification) {
      return successResponse(res, 200, 'Notifications', notification);
    }
    return notFoundError({ data: { message: 'Not Found!' } }, res);
  } catch (error) {
    return internalServerError({ data: { message: `Error: ${error} ,try again!`, res } }, res);
  }
};
export const readNotification = async (req, res) => {
  try {
    const { Id } = req.params;
    const notification = await getById(Id);
    if (!notification) {

      return notFoundError({ data: { message: ' notification Not Found!' } }, res);
    }
    if (!notification.isRead) {
      await markNotification(notification);
      return successResponse(
        res,
        200,
        'Notification marked as read succesfully'
      );
    }
    return successResponse(res, 200, 'The notification is already read');
  } catch (error) {
  
    return internalServerError({ data: { message: `Error: ${error} ,try again!`, res } }, res);
  }
};

export const readAllNotifications = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const notifications = await allNotifications(userId);
    notifications.forEach(async (notification) => {
      const Id = notification.id;
      const notificationQuery = await getById(Id);
      await markNotification(notificationQuery);
    });
    if (!notifications.length) {
      return notFoundError({ data: { message: 'You have no notification' } }, res);
    }
    return res.status(200).json({message:'All notification were marked as read'}) ;
  } catch (error) {
    return internalServerError({ data: { message: `Error: ${error} ,try again!`, res } }, res);
  }
};
