const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')
const Notification = require('../models/Notification')
const extractDate = require('../utils/custom').extractDateFromTimeStamp
router.post('/',async(req,res)=>{
    const {student_id,job_id,valid_up_to,uid} = req.body;
    if(!student_id || !job_id || !valid_up_to)
        return res.status(400).send("Student Id,Job Id and validate Date required")
    const booking = new Booking({
        student_id,
        job_id,
        valid_up_to
    })
    const result = await booking.save();
    const valid_date = extractDate(valid_up_to)
    const notification = new Notification({
        nt_type:'success',
        title:'Booking Done',
        subtitle:'This booking will be valid up to '+valid_date,
        uid:student_id
    })
    await notification.save()
    return res.status(200).send(result); 
})
router.get('/count/:id',async(req,res)=>{
    const id = req.params.id;
    if(!id)
        return res.status(400).send("No Id specified")
    const result = await Booking.find({job_id:id});
    return res.status(200).send(result.length.toString())
})
router.get('/user/:id',async(req,res)=>{
    const id = req.params.id;
    if(!id)
        return res.status(400).send("No ID found")
    const result = await Booking.find({student_id:id}).populate({
        path: "job_id", // populate job
        populate: {
           path: "user_uid" // in job, populate user_uid
        }
     })
    return res.status(200).send(result)
})
router.get('/user/id/:id',async(req,res)=>{
    const id = req.params.id;
    if(!id)
        return res.status(400).send("No ID found")
    const result = await Booking.find({student_id:id}).select('job_id -_id')
    const result_array = []
    result.forEach(r=>{
        result_array.push(r.job_id)
    })
    return res.status(200).send(result_array);
})
module.exports = router;