const { Router } = require("express");
const { verifyAdmin, verifyUser } = require("../helpers/auth");
const Message = require("../models/Message");

const messageRouter = Router();

messageRouter
    .route("/:channelId")
    .get(verifyUser(), async (req, res, next) => {
        try {
            const messages = await Message.find({
                channel: req.params.channelId,
            }).populate("author");
            res.json(messages);
        } catch (err) {
            next(err);
        }
    })
    .post(verifyUser(), async (req, res, next) => {
        try {
            const message = await Message.create({
                ...req.body,
                author: req.user._id,
                channel: req.params.channelId,
            });
            res.json(message);
        } catch (err) {
            next(err);
        }
    })
    .put(verifyUser(), async (req, res, next) => {
        next(new Error("This method is not allowed."));
    })
    .delete(verifyUser(), verifyAdmin(), async (req, res, next) => {
        try {
            const result = await Message.deleteMany({});
            res.json(result);
        } catch (err) {
            next(err);
        }
    });

module.exports = messageRouter;
