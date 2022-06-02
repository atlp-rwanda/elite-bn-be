/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const oauthCallback = (refreshToken, accessToken, profile, cb) => {
  if (profile) {
    const { displayName, emails, provider } = profile;
    const profileData = {
      fullname: displayName,
      email: emails[0].value,
      provider,
    };
    return cb(null, profileData);
  }
};
export default {

  oauthCallback,

};
