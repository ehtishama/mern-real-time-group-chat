const passport = require("passport");
const Channel = require("../models/Channel");

function verifyUser() {
    return passport.authenticate("jwt", { failWithError: true });
}

// This method assumes that the request contains 'user'.
function verifyAdmin() {
    return (req, res, next) => {
        if (req.user && req.user.admin) return next();
        return next(
            new Error("Only admin users are allowed to perform this action")
        );
    };
}

// This method assumes that the request contains 'user'.
function verifyChannelMembership(paramsKey) {
    return async (req, res, next) => {
        try {
            const channelId = req.params[paramsKey];
            const channel = await Channel.findOne({
                _id: channelId,
                members: req.user._id,
            });
            if (channel) return next();
            const error = new Error("You're not a member of this channel", {cause: "abc"});
            error.status = 403;

            return next(error);
        } catch (err) {
            return next(err);
        }
    };
}

function verifyChannelOwnership(paramsKey) {
    return async (req, res, next) => {
        try {
            const channel = await Channel.findOne({
                _id: req.params[paramsKey],
                created_by: req.user._id,
            });
            console.log("created by: ", req.user._id);
            if (channel) return next();
            else return next(new Error("You are not owner of this channel."));
        } catch (err) {
            next(err);
        }
    };
}

module.exports = {
    verifyUser,
    verifyAdmin,
    verifyChannelMembership,
    verifyChannelOwnership,
};
