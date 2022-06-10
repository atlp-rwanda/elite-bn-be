import { Feedback, Users, tripRequest } from '../database/models/index';
import user from '../database/models/user';

export const getFeedback = async (req, res) => {
  const feedback = await Feedback.findAll();

  return res.send({ message: 'Feedback fetched successfully', feedback });
};

export const sendFeedback = async (req, res) => {
  const { feedback, accomodationId } = req.body;
  const { email, id } = req.user;
  const tripRequets = await tripRequest.findAll({
    where: {
      accommodationId: accomodationId,
      tripperId: id,
      tripStatus: 'approved',
    },
  });
  if (!tripRequets) {
    return res.send({ message: 'You have not stayed in this accomodation' });
  }
  try {
    const createdFeedback = await Feedback.create({ userId: id, feedback, accomodationId });
    return res.send({ message: 'Feedback created successfully', data: createdFeedback });
  } catch (error) {
    return res.send({ message: 'Error creating feedback' });
  }
};
