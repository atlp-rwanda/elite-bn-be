import Joi from 'joi';

const tripSearch = Joi.object().keys({
  name: Joi.string().min(1).label('Enter a value to search by name'),
  email: Joi.string().min(1).label('Enter a value to search by email'),
  to: Joi.string().min(1).label('Enter a value to search by destination'),
  from: Joi.string().min(1).label('Enter a value to search by departure'),
  departDate: Joi.date().label('This should be a valid date'),
  returnDate: Joi.date().label('This should be a valid date'),
  tripStatus: Joi.string().min(1).label('Enter a value to search by status'),
});

export { tripSearch };
