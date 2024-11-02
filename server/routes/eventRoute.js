const express=require('express');
const router=express.Router();
const {getEvents,getAllEvents}=require('../controller/eventController');

router.get("/getevents",getEvents);
router.get("/getallevents",getAllEvents);

module.exports=router;