const usersModel = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// function untuk register
module.exports.register = async (req, res) => {
  try {
    // menambahkan user
    await bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      usersModel.create({ ...req.body, password: hash });
    });
    res.json("Berhasil Daftar").status(200);
  } catch (error) {
    // jika user sudah terdaftar
    if (error.code === 11000) {
      res.status(409).send("Users sudah ada");
    }
  }
  return;
};

// function untuk login
module.exports.login = async (req, res) => {
  await usersModel.findOne({ nim: req.body.nim }).then(async (user) => {
    if (user) {
      // mencocokan password
      const match = await checkUser(req.body.password, user.password);
      if (match === true) {
        console.log(user);
        res.cookie(
          "user",
          JSON.stringify({
            id: user._id,
            nim: user.nim,
            nama: user.nama,
            level: user.level,
          })
        );
        res
          .json({
            message: "Berhasil login",
            data: {
              nama: user.nama,
              nim: user.nim,
              jurusan: user.jurusan,
              id: user._id,
              level: user.level,
            },
          })
          .status(200);
      } else {
        res.status(403).send("Password salah");
      }
    }
  });
};

module.exports.ubahUser = async (req, res) => {
  const userdata = JSON.parse(req.cookies.user);
  await usersModel.findById(userdata.id).then((user) => {
    user.nama = req.body.nama;
    user.nim = req.body.nim;
    user.jurusan = req.body.jurusan;

    user
      .save()
      .then((resp) =>
        res.status(200).json({ message: "Berhasil ubah data user" })
      );
  });
};
module.exports.logout = (req, res) => {
  res.clearCookie("user");
  res.end();
};
const checkUser = async (inputPassword, dbPassword) => {
  const match = await bcrypt.compare(inputPassword, dbPassword);

  return match;
};
