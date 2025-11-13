const express= require("express");
const { emailSender, validateOTP, setPassword } = require("../controller/resetPass");
const router = express.Router();


router.route('/').post(emailSender);
router.route('/verify').post(validateOTP);
router.route('/setnewpassword').post(setPassword);

module.exports=router;  