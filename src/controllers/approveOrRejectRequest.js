import * as ApplicationError from '../utils/errors/applicatioErrors';
import models from '../database/models';

const { tripRequest, User } = models;

class approveOrRejectController {

  static approveTripRequest = async (req, res) => {
    const { id } = req.params;
    const changeStatus = { status: 'approved' };

    try {
      const SingleTrip = await tripRequest.findOne({
        where: { managerId: req.user.id, id },
      });
      if (!SingleTrip) {
        return res.status(404).json({ response: 'trip is not found' });
      }
      if (SingleTrip.status === 'approved') {
        return res
          .status(401)
          .json({ response: 'trip has already been approved' });
      }
      if (SingleTrip.status === 'rejected') {
        return res
          .status(401)
          .json({ response: 'you can not approve rejected trip' });
      }
      await tripRequest.update(changeStatus, {
        where: {
          managerId: req.user.id,
          status: 'pending',
          id,
        },
      }).then((data) => {
        res.status(200).json({ response: 'request approved successfully' });
      });
    } catch (error) {
        ApplicationError.internalServerError({ message: error }, res);
    }
  };

  static rejectTripRequest = async (req, res) => {
    const { id } = req.params;
    const changeStatus = { status: 'rejected' };

    try {
      const SingleTrip = await tripRequest.findOne({
        where: { managerId: req.user.id, id },
      });
      if (!SingleTrip) {
        return res.status(404).json({ response: 'trip is not found' });
      }
      if (SingleTrip.status === 'rejected') {
        return res
          .status(401)
          .json({ response: 'trip has already been rejected' });
      }
      if (SingleTrip.status === 'approved') {
        return res
          .status(401)
          .json({ response: 'you can not reject approved trip' });
      }
      await tripRequest.update(changeStatus, {
        where: {
          managerId: req.user.id,
          status: 'pending',
          id,
        },
      }).then((data) => {
        res.status(200).json({ response: 'request rejected successfully' });
      });
    } catch (error) {
      return ApplicationError.internalServerError({ message: error }, res);
    }
  };
}

export default approveOrRejectController;
