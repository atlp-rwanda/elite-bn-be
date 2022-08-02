import * as ApplicationError from '../utils/errors/applicatioErrors';
import models from '../database/models';
import * as notification from '../services/notificationService';

const { tripRequest, User } = models;

class approveOrRejectController {
  static approveTripRequest = async (req, res) => {
    const { id } = req.params;
    const changeStatus = { tripStatus: 'approved' };

    try {
      const SingleTrip = await tripRequest.findOne({
        where: { id: id },
      });
      if (!SingleTrip) {
        return res.status(404).json({ response: 'trip is not found' });
      }
      if (SingleTrip.tripStatus === 'approved') {
        return res.status(401).json({ response: 'trip has already been approved' });
      }
      if (SingleTrip.tripStatus === 'rejected') {
        return res.status(401).json({ response: 'you can not approve rejected trip' });
      }
      await tripRequest.update(changeStatus, {
        where: {
          id: id,
          tripStatus: 'pending',
        },
      });
      /** raise a notification on trip request status changed */
      const updatingStatus = {
        title: 'Trip Request Status Changed',
        message: 'Your Trip Request is Approved',
        type: 'application',
        tripId: req.params.id,
        addedBy: req.user.id,
        category: 'status',
      };
      await notification.addTripStatusNotification(updatingStatus).then((data) => {
        res.status(200).json({ response: 'request approved successfully' });
      });
    } catch (error) {
      ApplicationError.internalServerError({ message: error }, res);
    }
  };

  static rejectTripRequest = async (req, res) => {
    const { id } = req.params;
    const changeStatus = { tripStatus: 'rejected' };

    try {
      const SingleTrip = await tripRequest.findOne({
        where: { id: id },
      });
      if (!SingleTrip) {
        return res.status(404).json({ response: 'trip is not found' });
      }
      if (SingleTrip.tripStatus === 'rejected') {
        return res.status(401).json({ response: 'trip has already been rejected' });
      }
      if (SingleTrip.tripStatus === 'approved') {
        return res.status(401).json({ response: 'you can not reject approved trip' });
      }
      await tripRequest.update(changeStatus, {
        where: {
          id: id,
          tripStatus: 'pending',
          id,
        },
      });
      /** raise a notification on trip request status changed */
      const updatingStatus = {
        title: 'Trip Request Status Changed',
        message: 'Your Trip Request is Rejected',
        type: 'application',
        tripId: req.params.id,
        addedBy: req.user.id,
        category: 'status',
      };
      await notification.addTripStatusNotification(updatingStatus).then((data) => {
        res.status(200).json({ response: 'request rejected successfully' });
      });
    } catch (error) {
      
      return ApplicationError.internalServerError({ message: error }, res);
    }
  };
}

export default approveOrRejectController;
