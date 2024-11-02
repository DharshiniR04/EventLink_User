const express=require('express');
const router=express.Router();
const {bookEvent,getBookedEvent,deleteBookedEvent}=require('../controller/bookController');

router.post("/bookevent",bookEvent);
router.get("/getbookedevent",getBookedEvent);
router.delete("/deletebookedevent",deleteBookedEvent);

module.exports=router;