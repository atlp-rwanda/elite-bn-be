import { Like, Users } from '../database/models';

const UpdateOrCreate = async (model, data, likeStatus) => {
  const foundData = await Like.findOne({ where: { ...data, likeStatus } });
  if (foundData) {
    const item = await Like.destroy({ where: data });
    return { item, created: false };
  }
  const foundItem = await Like.findOne({ where: data });
  if (foundItem) {
    await Like.destroy({ where: data });
  }
  const item = await Like.create({ ...data, likeStatus });
  return { item, created: true };
};
const filterLikeArray = async (array) => {
  const newArray = array.map((like) => like.User);
  return newArray;
};

const getLikes = async (accomodationId, likeStatus) => {
  const likes = await Like.findAll({
    where: { accomodationId, likeStatus },
    include: [
      {
        model: Users,
        attributes: ['firstName', 'lastName'],
      },
    ],
    attributes: {
      exclude: ['id', 'accomodationId', 'userId', 'createdAt', 'updatedAt', 'likeStatus'],
    },
  });
  return filterLikeArray(likes);
};
export { UpdateOrCreate, getLikes };
