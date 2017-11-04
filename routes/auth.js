const passport = require('passport');
const express = require('express');
const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/surveys');
  }
);

router.get('/api/user', async (req, res) => {
  res.send(req.user);
});

router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
