import CountryService from '../services/countryService';
import LocationService from '../services/locationServices';
import {internalServerError} from '../utils/errors/applicatioErrors';

import ApplicationError from '../utils/errors/applicationError';

class LocationControllers {
  static createLocation = async (req, res) => {
    try {
      const country = await CountryService.findCountry({
        id: req.body.countryId,
      });
      if (!country) {
        return res.status(404).json({ message: 'country not found' });
      }
      const location = await country.createLocation({
        locationName: req.body.locationName,
        locationDescription: req.body.locationDescription,
        countryId: req.body.countryId,
        currency: req.body.currency,
        link: req.body.link,
      });

      return res.status(201).json({
        status: 201,
        message: 'Location added successfully',
        payload: location,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  };

  static getSingleLocation = async (req, res) => {
    try {
      const { locationId } = req.params;
      const singleLocation = await LocationService.getSingleLocation(locationId);

      if (!singleLocation) {
        return res.status(404).json({
          status: 404,
          error: 'location not found',
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'location retrieved successfully',
        payload: singleLocation,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  };

  static getAllLocationsInCountry = async (req, res) => {
    try {
      const country = await CountryService.findCountry({ id: req.params.id });
      if (!country) {
        return ApplicationError.internalServerError(
          { message: 'location can found in this country' },
          res
        );
      }
      const locations = await country.getLocations();
      res.json(locations);
    } catch (error) {
      ApplicationError.internalServerError({ message: error }, res);
    }
  };

  static updateLocation = async (req, res) => {
    try {
      const { locationId } = req.params;
      const location = await LocationService.getSingleLocation(locationId);
      if (!location) {
        return ApplicationError.internalServerError({ message: 'location not found' }, res);
      }
      await location.update(req.body);

      return res.status(200).json({
        status: 200,
        message: 'location updated successfully',
        payload: location,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  };

  static getAccommodations = async (req, res) => {
    try {
      const location = await LocationService.getSingleLocation(req.params.locationId);
      if(!location){
        return res.status(404).json({status:404,error:"location not found"})
      }
      else{
      const accommodations = await location.Accomodations;

      res.json({accommodations,status:200,message:"These are the accommodations in specified location"});
      }

    } catch (error) {
      internalServerError({message: error},res)
    
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  };

  static deleteLocation = async (req, res) => {
    try {
      const { locationId } = req.params;
      const location = await LocationService.getSingleLocation(locationId);
      if (!location) {
        return ApplicationError.internalServerError({ message: 'location not found' }, res);
      }
      const deletedLocation = await LocationService.deleteLocation(locationId);

      return res.status(200).json({
        status: 200,
        message: 'location deleted successfully',
        payload: deletedLocation,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  };
}

export default LocationControllers;
