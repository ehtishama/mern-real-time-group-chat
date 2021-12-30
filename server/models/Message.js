const { Schema, model, Types } = require("mongoose");
const Channel = require("./Channel");
const User = require("./User");

const Message = new Schema(
    {
        author: {
            type: Types.ObjectId,
            ref: User,
            required: true,
        },
        channel: {
            type: Types.ObjectId,
            ref: Channel,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Message", Message);
