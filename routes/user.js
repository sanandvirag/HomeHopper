const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

router
.route("/signup")
.get(
  usersController.signUpRender
)
.post(
  usersController.signUpRequest
);

router
.route("/login")
.get(
  usersController.logInRender
)
.post(
  saveRedirectUrl, 
  passport.authenticate('local',{ failureRedirect: '/login' , failureFlash:true}),
  usersController.logInRequest
);

router.get("/logout",
  usersController.logOutRequest
);

module.exports = router;
