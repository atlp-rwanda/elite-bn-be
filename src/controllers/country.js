import CountryService from '../services/countryService';

export default class CountryController {
  static addCountry = async (req, res) => {
    try {
      const country = await CountryService.create(req.body);
      return res.status(200).json({ message: 'Country added', country });
    } catch (error) {
      res.json({ message: error });
    }
  };

  static getAllCountries = async (req, res) => {
    try {
      const countries = await CountryService.getAllCountries();
      return res.json({ message: 'all countries', countries });
    } catch (error) {
      res.json({ message: error });
    }
  };
}
