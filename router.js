const router = require('express').Router()
const UserController = require('./controller/UserController')
const KunjunganController = require('./controller/KunjunganController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/kunjungan', KunjunganController.getKunjungan)
router.post('/kunjungan', KunjunganController.tambah)
module.exports = router