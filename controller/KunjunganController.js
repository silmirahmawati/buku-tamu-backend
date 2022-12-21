const kunjunganModel = require("../model/Kunjungan")

// menambahkan data kunjungan
module.exports.tambah = async (req,res) => {
    try{
        await kunjunganModel.create(req.body)
        res.send("Data Kunjungan Ditambahkan!")
    } catch (error) {
        res.send(error)
    }
    return
}

// mendapatkan data kunjungan
module.exports.getKunjungan = async (req,res) => {
    try {
        await kunjunganModel.find().then(dataKunjungan => {
            let data = dataKunjungan.filter((kunjungan) => {
                return kunjungan.user_id == "63919bcd642a2cdc9185edc6"
            })
            res.send(data)

        })
        
    } catch (error) {
        res.send(error)
    }
}