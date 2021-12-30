const { Schema, model, Types } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        avatartUrl: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

User.plugin(passportLocalMongoose);

module.exports = model("User", User);
