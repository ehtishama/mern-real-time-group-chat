const { Router } = require("express");
const Message = require("../models/Message");

const messageRouter = Router();

messageRouter
    .route("/:channelId")
    .get(async (req, res, next) => {
        try {
            const messages = await Message.find({
                channel: req.params.channelId,
            }).populate("author");
            res.json(messages);
        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const message = await Message.create({
                ...req.body,
                channel: req.params.channelId,
            });
            res.json(message);
        } catch (err) {
            next(err);
        }
    })
    .put(async (req, res, next) => {
        next(new Error("This method is not allowed."));
    })
    .delete(async (req, res, next) => {
        try {
            const result = await Message.deleteMany({});
            res.json(result);
        } catch (err) {
            next(err);
        }
    });

module.exports = messageRouter;
