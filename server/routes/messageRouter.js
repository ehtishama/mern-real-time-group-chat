const { Router } = require("express");
const { socketServer, store } = require("../bin/socket-server");
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
            const channelId = req.params.channelId;
            const message = await Message.create({
                ...req.body,
                author: req.user._id,
                channel: channelId,
            });

            const savedMessage = await Message.findById(message._id).populate(
                "author"
            );
            socketServer.to(channelId).emit("new_message", savedMessage);
            console.log("emitting to channel: ", channelId)
            // emit on connected sockets
            // if (store.has(req.params.channelId)) {
            //     // receivers
            //     const receivers = store.get(req.params.channelId);
            //     receivers.forEach((receiver) => {
            //         socketServer.emit("new_message", savedMessage);
            //     });
            // }

            res.json(message);
        } catch (err) {
            console.log(err);
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
