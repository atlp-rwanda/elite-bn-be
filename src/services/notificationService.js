import models from '../database/models';

const addTripStatusNotification = async (notification) => {
  const addNotification = await models.Notification.create(notification);
  return addNotification;
};
const addTripCommentNotification = async (notification) => {
  const addNotification = await models.Notification.create(notification);
  return addNotification;
};
const addNotificationsStatus = async (notification) => {
  const where = { userId: notification.userId, type: notification.type };
  const foundItem = await models.UserNotification.findOne({ where });
  if (!foundItem) {
    const item = await models.UserNotification.create(notification);
    return { item, created: true };
  }
  const item = await models.UserNotification.update(
    { isAllowed: notification.isAllowed },
    { where }
  );
  return { item, created: false };
};
const getById = async (id) => {
  const foundItem = await models.Notification.findOne({ where: { id: `${id}` } });
  if (!foundItem) {
    return null;
  }
  return foundItem;
};

const allNotifications = async (user) => {
  const found = await models.Notification.findAll({ where: {} });
  return found;
};

const checkIfBlocked = async (where) => {
  const foundItem = await models.UserNotification.findOne({ where });
  if (!foundItem) {
    return false;
  }
  return true;
};

export {
  addTripStatusNotification,
  addTripCommentNotification,
  addNotificationsStatus,
  allNotifications,
  checkIfBlocked,
  getById,
};
