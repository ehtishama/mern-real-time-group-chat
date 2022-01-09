const { Router } = require("express");
const passport = require("../lib/passport");
const User = require("../models/User");
const userRouter = Router();
const jsonwebtoken = require("jsonwebtoken");
const config = require("../config");
const Channel = require("../models/Channel");

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
            _id: req.user._id,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            username: req.user.username,
            token: jsonwebtoken.sign({ _id: req.user._id }, config.JWT_SECRET),
        });
    });

// create new user
userRouter.route("/signup").post(async (req, res, next) => {
    try {
        const { _id, firstname, lastname, username, email } = await User.register(
            { ...req.body },
            req.body.password
        );

        const channel = await Channel.findById("61cd7b7297dbe579c2598026"); // welcome channel
        const member = _id;
        channel.members.addToSet(member);
        await channel.save();

        res.json({ _id, firstname, lastname, username, email });
    } catch (err) {
        err.status = 409;
        next(err);
    }
});

module.exports = userRouter;
