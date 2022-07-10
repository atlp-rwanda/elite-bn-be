import * as ApplicationError from '../utils/errors/AppError';
import { successResponse } from '../utils/response';
import { UpdateOrCreate, getLikes } from '../services/likeService';
import Like from '../database/models/like';
import AccommodationService from '../services/accomodationService';

const like = async (req, res) => {
  try {
    const { accomodation_id: accomodationId } = req.params;
    const { id: userId } = req.user;
    const accomodationExist = await AccommodationService.getOneAccommodation(accomodationId);
    if (!accomodationExist) {
      return res.status(404).json({ data: { message: 'Accommodation not found!' } });
    }
    const { created } = await UpdateOrCreate(Like, { accomodationId, userId }, true);
    if (created) {
      return res.status(201).json({ data: { message: 'Liked the accommodation!' } });
    }
    return successResponse(res, 200, 'Unliked the accommodation!');
  } catch (error) {
    return ApplicationError.internalServerError(error.message, res);
  }
};

const disLike = async (req, res) => {
  try {
    const { accomodation_id: accomodationId } = req.params;
    const { id: userId } = req.user;
    const accomodationExist = await AccommodationService.getOneAccommodation(accomodationId);
    if (!accomodationExist) {
      return res.status(404).json({ data: { message: 'Accommodation not found!' } });
    }
    const { created } = await UpdateOrCreate(Like, { accomodationId, userId }, true);
    if (created) {
      return res.status(201).json({ data: { message: 'Disliked the accommodation!' } });
    }
    return successResponse(res, 200, 'Undisliked the accommodation!');
  } catch (error) {
    return ApplicationError.internalServerError(error.message, res);
  }
};

const allLikes = async (req, res) => {
  try {
    const { accomodation_id: accomodationId } = req.params;
    const accomodationExist = await AccommodationService.getOneAccommodation(accomodationId);
    if (!accomodationExist) {
      return ApplicationError.notFoundError('Accommodation not found!', res);
    }
    const accomodationLikes = await getLikes(accomodationId, true);
    if (!accomodationLikes.length) {
      return successResponse(res, 200, 'No likes for this accommodation', {
        total_likes: 0,
      });
    }
    return successResponse(res, 200, 'Summary for the accommodation likes', {
      total_likes: accomodationLikes.length,
      likedBy: accomodationLikes,
    });
  } catch (error) {
    return ApplicationError.internalServerError(error.message, res);
  }
};
const allDisLikes = async (req, res) => {
  try {
    const { accomodation_id: accomodationId } = req.params;
    const accomodationExist = await AccommodationService.getOneAccommodation(accomodationId);
    if (!accomodationExist) {
      return ApplicationError.notFoundError('Accommodation not found!', res);
    }
    const accomodationDisLikes = await getLikes(accomodationId, false);
    if (!accomodationDisLikes.length) {
      return successResponse(res, 200, 'No dislikes for this accomodation', {
        total_dislikes: 0,
      });
    }
    return successResponse(res, 200, 'Summary for the accomodation dislikes', {
      total_dislikes: accomodationDisLikes.length,
      dislikedBy: accomodationDisLikes,
    });
  } catch (error) {
    return ApplicationError.internalServerError(error.message, res);
  }
};
export {
  like, disLike, allLikes, allDisLikes
};
