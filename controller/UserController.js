const usersModel = require("../model/User")
const bcrypt = require('bcrypt');
const saltRounds = 10;

// function untuk register
module.exports.register = async (req,res) => {
    try{
        // menambahkan user
        await bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            usersModel.create({...req.body, password: hash})
        });
        res.json("Berhasil Daftar").status(200)
    } catch (error) {
        // jika user sudah terdaftar
        if(error.code === 11000){
            res.status(409).send("Users sudah ada")
        }
    }
    return
}

// function untuk login
module.exports.login = async (req,res) => {
    console.log(req.body)
    // mencari user berdasarkan nim
    await usersModel.findOne({nim: req.body.nim}).then(async (user) => {
        if(user){
            // mencocokan password
            const match = await checkUser(req.body.password, user.password)
            if(match === true){
                res.cookie("user", JSON.stringify({id: user._id, nim: user.nim, nama: user.nama})).json("Berhasil login").status(200)
            }
            else {
                res.status(403).send("Password salah")
            }
        }
    })
}
const checkUser = async (inputPassword, dbPassword) => {
    const match = await bcrypt.compare(inputPassword, dbPassword);
    
    return match
}