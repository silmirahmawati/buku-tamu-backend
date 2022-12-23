const tokenModel = require("../model/TokenTamu");

// menambahkan data kunjungan
module.exports.tambah = async () => {
  try {
    console.log(tokenModel.create);
    const resp = await tokenModel
      .create({})
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    console.log({ message1: resp });
  } catch (error) {
    console.log({ message: error });
  }
  return;
};

// mendapatkan data kunjungan
module.exports.getToken = async (req, res) => {
  try {
    let date = new Date();
    await tokenModel
      .findOne({
        tanggal: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1
        ),
      })
      .then((resp) => {
        console.log(resp);
        if (resp == null) {
          this.tambah();
          this.getToken();
        }
        res.status(200).json(resp);
      });
  } catch (error) {
    res?.send(error);
  }
};
