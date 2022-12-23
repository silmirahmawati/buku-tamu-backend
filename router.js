const router = require("express").Router();
const UserController = require("./controller/UserController");
const KunjunganController = require("./controller/KunjunganController");
const TokenController = require("./controller/TokenController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.put("/user", UserController.ubahUser);
router.get("/kunjungan", KunjunganController.getKunjungan);
router.get("/admin/kunjungan", KunjunganController.adminGetKunjungan);
router.post("/kunjungan", KunjunganController.tambah);
router.get("/token", TokenController.getToken);
module.exports = router;
