const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const config = require("../config");

const User = require("../models/User");

// Local Strategy
passport.use("local", User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// JWT Strategy
const jwtStrategy = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.JWT_SECRET,
    },
    async (payload, done) => {
        const userId = payload._id;
        try {
            const user = await User.findById(userId);
            if (user) return done(null, user);
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    }
);
passport.use("jwt", jwtStrategy);
module.exports = passport;
