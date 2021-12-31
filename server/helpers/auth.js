const passport = require("passport");

function verifyUser() {
    return passport.authenticate("jwt");
}

function verifyAdmin() {
    return (req, res, next) => {
        if (req.user && req.user.admin) return next();
        return next(
            new Error("Only admin users are allowed to perform this action")
        );
    };
}

module.exports = {
    verifyUser,
    verifyAdmin,
};
