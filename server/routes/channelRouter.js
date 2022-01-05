const { Router } = require("express");
const Channel = require("../models/Channel");
const {
    verifyUser,
    verifyAdmin,
    verifyChannelMembership,
    verifyChannelOwnership,
} = require("../helpers/auth");

const channelRouter = Router();
channelRouter
    .route("/")
    .all(verifyUser())
    .get(async (req, res, next) => {
        try {
            const channels = await Channel.find({});
            res.json(channels);
        } catch (err) {
            next(err);
        }
    })
    .put((req, res, next) => {
        next(new Error("Method not supported."));
    })
    .post(async (req, res, next) => {
        try {
            const channel = await Channel.create({
                ...req.body,
                created_by: req.user._id,
            });
            res.json(channel);
        } catch (err) {
            next(err);
        }
    })
    .delete(verifyAdmin(), async (req, res, next) => {
        try {
            const result = await Channel.deleteMany({});
            res.json(result);
        } catch (err) {
            next(err);
        }
    });

channelRouter
    .route("/:channelId")
    .all(verifyUser())
    .get(async (req, res, next) => {
        try {
            const channel = await Channel.findById(
                req.params.channelId
            ).populate("members");
            res.json(channel);
        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        next(new Error("This method is not allowed."));
    })
    .put(verifyChannelOwnership("channelId"), async (req, res, next) => {
        try {
            const updated = await Channel.findByIdAndUpdate(
                req.params.channelId,
                {
                    $set: { ...req.body },
                },
                { new: true }
            );
            res.json(updated);
        } catch (err) {
            next(err);
        }
    })
    .delete(verifyChannelOwnership("channelId"), async (req, res, next) => {
        try {
            const result = await Channel.findByIdAndDelete(
                req.params.channelId
            );
            res.json(result);
        } catch (err) {
            next(err);
        }
    });

channelRouter
    .route("/:channelId/members")
    .all(verifyUser())
    .get(async (req, res, next) => {
        try {
            const channel = await Channel.findById(
                req.params.channelId
            ).populate("members");
            res.json(channel.members);
        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const channel = await Channel.findById(req.params.channelId);
            const member = req.user._id;
            channel.members.addToSet(member);
            const updatedChannel = await channel.save();
            res.json(updatedChannel.members);
        } catch (err) {
            next(err);
        }
    })
    .put(async (req, res, next) => {
        next(new Error("This method is not supported."));
    })
    .delete(verifyAdmin(), async (req, res, next) => {
        try {
            const channel = await Channel.findByIdAndUpdate(
                req.params.channelId,
                {
                    $set: { members: [] },
                },
                { new: true }
            );
            res.json(channel.members);
        } catch (err) {
            next(err);
        }
    });

channelRouter
    .route("/:channelId/members/:memberId")
    .get(verifyUser(), async (req, res, next) => {
        try {
            const channel = await Channel.findOne(
                {
                    _id: req.params.channelId,
                    members: req.params.memberId,
                },
                { "members.$": 1 }
            ).populate("members");

            res.json(channel?.members || []);
        } catch (err) {
            next(err);
        }
    })
    // TODO:: verifySelf i.e. memberId === req.user._id
    .delete(verifyUser(), verifyAdmin(), async (req, res, next) => {
        try {
            const updated = await Channel.findByIdAndUpdate(
                req.params.channelId,
                {
                    $pull: {
                        members: req.params.memberId,
                    },
                },
                {
                    new: true,
                }
            );

            res.json(updated);
        } catch (err) {
            next(err);
        }
    });

module.exports = channelRouter;
