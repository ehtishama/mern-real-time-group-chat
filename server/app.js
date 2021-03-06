const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("./lib/passport");
const config = require("./config");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/usersRouter");
const channelRouter = require("./routes/channelRouter");
const messageRouter = require("./routes/messageRouter");
const { socketServer } = require("./bin/socket-server");

const app = express();

// socket server
app.io = socketServer;

mongoose.connect(config.MONGO_URL);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// middlewares
app.use(passport.initialize());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/channels", channelRouter);
app.use("/messages", messageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500).json({
        ...err,
        message: err.message,
        name: err.name,
    });
    // res.render("error");
});

module.exports = app;
