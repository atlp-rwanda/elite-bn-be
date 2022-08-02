import tripCommentService from '../services/tripCommentService';
import applicationErr from '../utils/errors/applicationError';
import * as notification from '../services/notificationService';

export const makeTripComment = async (req, res, next) => {
  try {
    const isTripId = await tripCommentService.findTripId(req.params.tripId);

    if (!isTripId) {
      return next(new applicationErr('Trip request Not found', 404));
    }

    const tripperCommentOn = await tripCommentService.findTripper(req.params.tripId);
    const freshUser = await tripCommentService.findCurrentUser(req.user.id);

    const noNullSuper = tripperCommentOn !== null;
    const manager = freshUser.role === 'manager';
    const superAd = freshUser.role === 'super admin';

    if (
      tripperCommentOn === null &&
      freshUser.role !== 'manager' &&
      freshUser.role !== 'super admin'
    ) {
      return next(new applicationErr('You are unauthorized on this comment section', 401));
    } else if ((noNullSuper && manager) || (noNullSuper && superAd)) {
      const commentOnTrip = {
        tripId: req.params.tripId,
        tripperId: req.user.id,
        comment: req.body.comment,
      };

      const tripComment = await tripCommentService.makeComment(commentOnTrip);
      /** raise a notification */
      const newNotification = {
        title: 'New Comment To A trip You Made',
        message: req.body.comment,
        type: 'application',
        tripId: req.params.tripId,
        addedBy: req.user.id,
        category: 'comment',
      };
      await notification.addTripCommentNotification(newNotification);
      return res.status(201).json({ message: 'Comment saved successfully', tripComment });
    } else if (tripperCommentOn !== null && tripperCommentOn.tripperId !== freshUser.id) {
      return next(new applicationErr('You are unauthorized on this comment section', 401));
    } else if (
      tripperCommentOn.tripperId === freshUser.id ||
      freshUser.role === 'manager' ||
      freshUser.role === 'super admin'
    ) {
      const commentOnTrip = {
        tripId: req.params.tripId,
        tripperId: req.user.id,
        comment: req.body.comment,
      };
      const tripComment = await tripCommentService.makeComment(commentOnTrip);

      return res.status(201).json({ message: 'Comment saved successfully', tripComment });
    }
  } catch (error) {
    return next(new applicationErr(' Failed to comment on this trip request', 500));
  }
};

export const getTripComment = async (req, res, next) => {
  try {
    const isTripId = await tripCommentService.findTripId(req.params.tripId);

    if (!isTripId) {
      return next(new applicationErr('Trip request Not found', 404));
    }

    const tripperCommentOn = await tripCommentService.findTripper(req.params.tripId);
    const freshUser = await tripCommentService.findCurrentUser(req.user.id);

    const noNullSuper = tripperCommentOn !== null;
    const manager = freshUser.role === 'manager';
    const superAd = freshUser.role === 'super admin';

    if (
      tripperCommentOn === null &&
      freshUser.role !== 'manager' &&
      freshUser.role !== 'super admin'
    ) {
      return next(new applicationErr('You are unauthorized on this comment section', 401));
    } else if ((noNullSuper && manager) || (noNullSuper && superAd)) {
      const tripComment = await tripCommentService.getComments(req.params.tripId);
      return res.json({ message: 'All comment on this trip request', tripComment });
    } else if (tripperCommentOn !== null && tripperCommentOn.tripperId !== freshUser.id) {
      return next(new applicationErr('You are unauthorized on this comment section', 401));
    } else if (
      tripperCommentOn.tripperId === freshUser.id ||
      freshUser.role === 'manager' ||
      freshUser.role === 'super admin'
    ) {
      const tripComment = await tripCommentService.getComments(req.params.tripId);
      return res.json({ message: 'All comment on this trip request', tripComment });
    }
  } catch (error) {
    return next(new applicationErr('failed to get comments on trip', 500));
  }
};

export const deleteTripComment = async (req, res, next) => {
  try {
    const isCommentId = await tripCommentService.findCommentId(req.params.commentId);
    if (!isCommentId) {
      return res.status(404).json({ message: 'Commnet on trip request Not found' });
    }

    const freshUser = await tripCommentService.findCurrentUser(req.user.id);
    const tripperCommentOn = await tripCommentService.findCommenter(
      req.params.commentId,
      req.user.id
    );

    const notCommenter = tripperCommentOn === null;
    const notSuperUser = freshUser.role !== 'manager' || freshUser.role !== 'super admin';
    const superUser = freshUser.role === 'manager' || freshUser.role === 'super admin';
    if (superUser) {
      const deleteComm = await tripCommentService.deleteComment(req.params.commentId);
      return res.json({ message: 'comment on trip deleted', deleteComm });
    } else if (notCommenter && notSuperUser) {
      return next(new applicationErr("You're Unauthorized to delete this comment", 401));
    } else if (tripperCommentOn.tripperId !== freshUser.id && superUser) {
      const deleteComm = await tripCommentService.deleteComment(req.params.commentId);
      return res.json({ message: 'comment on trip deleted', deleteComm });
    } else if (tripperCommentOn.tripperId == freshUser.id || superUser) {
      const deleteComm = await tripCommentService.deleteComment(req.params.commentId);
      return res.json({ message: 'comment on trip deleted', deleteComm });
    }
  } catch (error) {
    return next(new applicationErr('Failed to delete a comment on this trip', 500));
  }
};
