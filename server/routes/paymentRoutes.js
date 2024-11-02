const express=require('express');
const router=express.Router();
const {getPaymentDetail,storePayment,getPayedEvents,fetchQR}=require('../controller/paymentController');

router.get("/getpaymentdetail",getPaymentDetail);
router.post("/storepayment",storePayment);
router.get("/getpayedevent",getPayedEvents);
router.get("/fetchqr",fetchQR);

module.exports=router;