const kunjunganModel = require("../model/Kunjungan");
const tokenModel = require("../model/TokenTamu");
const usersModel = require("../model/User");

// menambahkan data kunjungan
module.exports.tambah = async (req, res) => {
  try {
    const date = new Date();
    const user_id = JSON.parse(req.cookies.user).id;
    const qrtoken = await tokenModel.findOne({ token: req.body.token });
    if (
      qrtoken.tanggal.toString() !=
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      ).toString()
    ) {
      res.status(403).json({ message: "QR Code Kadaluwarsa" });
      return;
    }
    await kunjunganModel
      .create({
        keterangan: req.body.keterangan,
        user_id: user_id,
      })
      .then((resp) => {
        res
          .status(200)
          .json({ message: "Data Kunjungan Ditambahkan!", data: resp });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(500).send(error);
  }
  return;
};

// mendapatkan data kunjungan
module.exports.getKunjungan = async (req, res) => {
  console.log(req.cookies);
  console.log(JSON.parse(req.cookies.user)?.id);
  try {
    await kunjunganModel
      .find()
      .sort({ waktu: -1 })
      .then((dataKunjungan) => {
        let data = dataKunjungan.filter((kunjungan) => {
          return kunjungan.user_id == JSON.parse(req.cookies.user).id;
        });
        res.send(data);
      });
  } catch (error) {
    res.send(error);
  }
};
module.exports.adminGetKunjungan = async (req, res) => {
  try {
    let query = new Date();
    if (req.params?.q === "today") {
      console.log("WOY");
      query = {
        waktu: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1
        ),
      };
    } else {
      query = "";
    }
    const dataUser = await usersModel.find();
    console.log("sampe sini");
    await kunjunganModel.find().then((dataKunjungan) => {
      console.log(dataKunjungan);
      dataKunjungan = dataKunjungan.map((kunjungan) => {
        let nim, nama;
        dataUser.forEach((user) => {
          if (user._id.toString() == kunjungan.user_id.toString()) {
            nim = user.nim;
            nama = user.nama;
          }
        });
        return { ...kunjungan._doc, nim, nama };
      });
      if (query.waktu) {
        dataKunjungan = dataKunjungan.filter((data, index) => {
          return data.waktu == query.waktu;
        });
      }
      console.log(dataKunjungan);
      res.status(200).json(dataKunjungan);
    });
  } catch (error) {
    res.send(error);
  }
};
