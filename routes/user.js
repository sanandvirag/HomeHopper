const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

router.get("/signup",
  usersController.signUpRender
);

router.post("/signup",
  usersController.signUpRequest
);

router.get("/login",
  usersController.logInRender
);

router.post("/login", 
  saveRedirectUrl, 
  passport.authenticate('local',{ failureRedirect: '/login' , failureFlash:true}),
  usersController.logInRequest
);

router.get("/logout",
  usersController.logOutRequest
);

module.exports = router;
