import express from 'express';
import socialAuth, { userToken } from '../controllers/googleFacebook';

const router = express.Router();

router.use(socialAuth.initialize());

router.get('/login', (req, res) => {
  res.sendFile('googleFacebook.html', { root: `${__dirname}/../services/templates/` });
});

router.get('/google', socialAuth.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', socialAuth.authenticate('google'), userToken);

router.get('/facebook', socialAuth.authenticate('facebook'));

router.get('/facebook/callback', socialAuth.authenticate('facebook'), userToken);

export default router;
