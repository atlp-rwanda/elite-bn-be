import models from '../database/models';

class tripCommentService {
  static makeComment = async (data) => {
    return models.tripComment.create(data);
  };

  static getComments = async (tripId) => {
    return models.tripComment.findAll({
      where: { tripId: tripId },
      include: [{ model: models.Users, as: 'requester', attributes: ['username'] }],
      attributes: {
        exclude: ['id', 'tripId', 'tripperId', 'createdAt', 'updatedAt'],
      },
    });
  };

  static deleteComment = async (commentId) => {
    return models.tripComment.destroy({ where: { id: commentId } });
  };

  static findTripId = async (id) => {
    return models.tripRequest.findOne({ where: { id: id } });
  };

  static findCommentId = async (commentId) => {
    return models.tripComment.findOne({ where: { id: commentId } });
  };

  static findCommenter = async (commentId, tripperId) => {
    return models.tripComment.findOne({ where: { id: commentId, tripperId: tripperId } });
  };

  static findTripper = async (tripId) => {
    return models.tripRequest.findOne({ where: { id: tripId } });
  };

  static findCurrentUser = async (id) => {
    return models.Users.findByPk(id);
  };
}

export default tripCommentService;
