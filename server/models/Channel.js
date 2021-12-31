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
            required: true,
        },
        members: [
            {
                type: Types.ObjectId,
                ref: User,
                required: true,
                unique: true
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = model("Channel", Channel);
