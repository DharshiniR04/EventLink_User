const express=require('express');
const {signup,login,verifyOtp,passwordRecovery} =require('../controller/authController')
const router=express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/verify-otp',verifyOtp);
router.get('/passwordRecovery',passwordRecovery);

module.exports=router;