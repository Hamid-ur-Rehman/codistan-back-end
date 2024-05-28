const mongoose = require('mongoose')
const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: false,
            default: 0
        },
        email: {
            type: String,
            required: false,
            default: 0
        },
        address: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: false
        }
    },
    {
        timestamp: true
    }
)

const User = mongoose.model("user", UserSchema)

module.exports = User