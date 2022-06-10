import models from '../../database/models';

export default class Rate {
  static update(userId, accommodationId, rate) {
    return models.Rates.update({ rate }, { where: { userId, accommodationId } });
  }
}
