const mongoose = require("mongoose");

// Schema database untuk object token
let date = new Date();
console.log(new Date());
let rand = () => {
  return Math.random().toString(36).substr(2);
};
var tokenSchema = mongoose.Schema({
  tanggal: {
    type: Date,
    default: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
  },
  token: {
    type: String,
    default: rand(),
  },
});

let tokenModel = mongoose.model("token", tokenSchema);

module.exports = tokenModel;
