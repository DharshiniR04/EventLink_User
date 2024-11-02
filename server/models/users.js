const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
    },
    department: {
        type: String,
    },
    college: {
        type: String,
    },
    mobile: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Users = new mongoose.model("Users", UserSchema);
module.exports = Users;