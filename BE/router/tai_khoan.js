const express = require ('express')
const { getTaiKhoanForLevel2, getTaiKhoanForLevel1 } = require('../controllers/tai_khoan');

const router = express.Router();
router.get('/tai-khoan/level1', getTaiKhoanForLevel1);
router.get('/tai-khoan/level2', getTaiKhoanForLevel2);
module.exports = router;