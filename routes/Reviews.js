const express = require('express')
const router = express.Router()
const Review = require('../models/Reviews')
router.post('/',async(req,res)=>{
    const {job_id,student_id,review,stars} = req.body
    const rv = new Review({
        job_id,
        student_id,
        review,
        stars
    })
    const result = await rv.save()
    return res.status(200).send(result);
})
router.get('/job/:id',async(req,res)=>{
    const id = req.params.id;
    const result = await Review.find({job_id:id})
    return res.status(200).send(result)
})
router.get('/',async(req,res)=>{
    const {job_id,student_id} = req.query;
    const result = await Review.find({job_id,student_id})
    return res.status(200).send(result)
})
module.exports = router;