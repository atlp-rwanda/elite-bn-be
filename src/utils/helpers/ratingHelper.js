/* eslint-disable */
const getRateArray = (array) => {
    
    const newArray = array.map((a) => a.serviceRating);
    return newArray;
  };
  
  const classRating = (ratings) => {
    const serviceRating = getRatingArray(ratings);
    const count = {};
    for (let i = 0; i < serviceRating.length; i++) {
      if (count[serviceRating[i]]) {
        count[serviceRating[i]] += 1;
      } else {
        count[serviceRating[i]] = 1;
      }
    }
    return count;
  };
  export { getRateArray, classRating };