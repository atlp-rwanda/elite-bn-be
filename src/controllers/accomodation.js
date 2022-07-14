import AccommodationService from '../services/accomodationService';
import cloudinary from '../config/cloudinary';
import LocationService from '../services/locationServices';
import * as ApplicationError from '../utils/errors/applicatioErrors';
import { Accommodation } from '../database/models';
import changeToArray from '../utils/helpers/changeToArray';

class AccomodationController {
  static createAccommodation = async (req, res, next) => {
    try {
      const location = await LocationService.getSingleLocation(req.body.locationId);
      if (!location) {
        return res.status(404).json({
          status: '404',
          message: 'location  not found found try again!!!',
        });
      }
      if ('files' in req) {
        const pictures = req.files;
        const urls = [];
        const uploadImages = pictures.map((image) =>
          cloudinary.uploader.upload(image.path, { folder: 'elite' })
        );
        const imageResponse = await Promise.all(uploadImages);
        imageResponse.forEach((image) => {
          return urls.push(image.url);
        });
        req.body = {
          ...req.body,
          accomodationImage: urls,
        };
      }
      req.body.amenities = changeToArray(req.body.amenities);
      const createdAccommodation = await AccommodationService.createAccommodation(req.body);
      return res.status(201).json({
        status: '201',
        message: 'Accommodation added successfully',
        payload: createdAccommodation,
      });
    } catch (error) {
      console.log(error);
      ApplicationError.internalServerError(
        { message: 'can not created accommodation Try again!!!' },
        res
      );
    }
  };

  static getOneAccommodation = async (req, res, next) => {
    try {
      const { accommodationId } = req.params;
      const accommodation = await AccommodationService.getOneAccommodation(accommodationId);
      if (!accommodation) {
        return res.status(404).json({
          status: '404',
          message: 'Accommodation not found',
        });
      }
      return res.status(200).json({
        status: '200',
        message: 'Accommodation found',
        payload: accommodation,
      });
    } catch (error) {
      ApplicationError.internalServerError({ message: error }, res);
    }
  };

  static getAccommodationsByLocation = async (req, res, next) => {
    try {
      const { locationId } = req.params;
      const location = await LocationService.getSingleLocation(locationId);
      if (!location) {
        return ErrorResponse.notFoundError(res, 'Location not found');
      }
      const accommodations = await AccommodationService.getAccommodationsByLocation(locationId);
      res.status(200).json({
        status: 200,
        message: 'These are the accommodations in specified location',
        payload: accommodations,
      });
    } catch (error) {
      ApplicationError.internalServerError({ message: error }, res);
    }
  };

  static getAllAccommodations = async (req, res, next) => {
    try {
      const accommodations = await AccommodationService.getAllAccommodations();
      res.status(200).json({
        status: 200,
        message: 'These are all the accommodations',
        payload: accommodations,
      });
    } catch (error) {
      ApplicationError.internalServerError({ message: error }, res);
    }
  };

  static updateAccommodation = async (req, res, next) => {
    try {
      const { accommodationId } = req.params;
      req.body.amenities = changeToArray(req.body.amenities);
      const accommodation = await AccommodationService.getOneAccommodation(accommodationId);
      if (!accommodation) {
        return res.status(404).json({
          status: '404',
          message: 'Accommodation not found',
        });
      }

      if ('files' in req) {
        const imagesURLs = [];
        const uploadImages = req.files.map((image) =>
          cloudinary.uploader.upload(image.path, { folder: 'elite' })
        );
        const imageResponse = await Promise.all(uploadImages);
        imageResponse.forEach((image) => {
          return imagesURLs.push(image.url);
        });

        req.body = {
          ...req.body,
          accomodationImage: imagesURLs,
        };
      }

      const updatedAccommodation = await AccommodationService.updateAccommodation(
        req.params.accommodationId,
        req.body
      );

      res.status(200).json({
        status: 200,
        message: 'accommodation updated successfully',
        payload: updatedAccommodation,
      });
    } catch (error) {
      ApplicationError.internalServerError({ message: 'can not update try again !!!' }, res);
    }
  };

  static getAllRooms = async (req, res) => {
    try {
      const accommodation = await AccommodationService.getOneAccommodation(
        req.params.accommodationId
      );
      const rooms = await accommodation.getRooms();
      res.json(rooms);
    } catch (error) {
      ApplicationError.internalServerError({ message: error }, res);
    }
  };

  static deleteAccommodation = async (req, res, next) => {
    try {
      const { accommodationId } = req.params;
      const accommodation = await AccommodationService.getOneAccommodation(accommodationId);
      if (!accommodation) {
        return res.status(404).json({
          status: '404',
          message: 'Accommodation not found',
        });
      }

      const deletedAccommodation = await AccommodationService.deleteAccommodation(
        req.params.accommodationId
      );
      res.status(200).json({
        status: 200,
        message: 'accommodation deleted successfully',
        payload: deletedAccommodation,
      });
    } catch (error) {
      ApplicationError.internalServerError({ message: 'can not delete try again' }, res);
    }
  };
}

export default AccomodationController;
