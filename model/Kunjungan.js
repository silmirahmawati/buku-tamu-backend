const mongoose = require("mongoose")

// Schema database untuk object kunjungan
var kunjunganSchema = mongoose.Schema({
    waktu:{
        type: Date,
        required: true,
        default: new Date()
    },
    keterangan: {
        type: String,
        required: true,
    },
    user_id : {
        type: mongoose.ObjectId,
        required: false,
    }
})

let kunjunganModel = mongoose.model("Kunjungan", kunjunganSchema)

module.exports = kunjunganModel