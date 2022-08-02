import {
  addNotificationsStatus,
  allNotifications,
  checkIfBlocked,
  getById,
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
