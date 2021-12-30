const passport = require("passport");
const User = require("../models/User");

passport.use("local", User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
