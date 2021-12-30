const { Router } = require("express");
const async = require("hbs/lib/async");
const passport = require("../lib/passport");
const User = require("../models/User");
const userRouter = Router();

// get all registered users
userRouter.route("/").get(async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// authenticate user
userRouter
    .route("/login")
    .post(passport.authenticate("local"), (req, res, next) => {
        res.json({
            status: "authenticated",
        });
    });

// create new user
userRouter.route("/signup").post(async (req, res, next) => {
    try {
        const user = await User.register({ ...req.body }, req.body.password);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

module.exports = userRouter;
