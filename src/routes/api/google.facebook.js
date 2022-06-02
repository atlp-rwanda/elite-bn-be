/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import SocialLogin from '../../controllers/google.facebook.login';
import AuthControllers from "../../controllers/auth.controller";

const { googleLogin, facebookLogin } = SocialLogin;
const router = express.Router();

router.get(
  "/user/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/user/login/google/redirect/",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  AuthControllers.loginCallback
);

router.get(
  "/user/login/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/user/login/facebook/redirect/",
  passport.authenticate("facebook", {
    failureRedirect: "/",
  }),
  AuthControllers.loginCallback
);

router.post('/auth/googlelogin', googleLogin);
router.post('/auth/facebooklogin', facebookLogin);
