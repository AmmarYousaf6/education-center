const passport = require('passport');
const express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Your account has been activated' });
});

router.get('/profile', isLoggedIn, function (req, res) {
    let userResponse = {
      name : req.user.name.givenName+' '+req.user.name.familyName,
      email : req.user.emails[0].value
    }
    res.status(200).json({
      status : 1,
      data : userResponse,
      message : 'success'
  });
});

router.get('/auth/linkedin', passport.authenticate('linkedin', {
  scope: ['r_liteprofile','r_emailaddress', ],
}));

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = router;