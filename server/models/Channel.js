const { Schema, model, Types } = require("mongoose");
const User = require("./User");

const Channel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        created_by: {
            type: Types.ObjectId,
            ref: User,
        },
        members: [
            {
                type: Types.ObjectId,
                ref: User,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = model("Channel", Channel);
