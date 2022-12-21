const mongoose = require("mongoose")

// Schema database untuk object users
var usersSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    nim: {
        type: String,
        required: true,
        unique: true,
    },
    jurusan: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
        required: false,
    }
})

let usersModel = mongoose.model("Users", usersSchema)

module.exports = usersModel