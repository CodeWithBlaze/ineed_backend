const Job = require("../models/Job");
const express = require('express');
const router = express.Router();



router.post('/',async(req,res)=>{
    const job = new Job(req.body);
    const result = await job.save()
    return res.status(200).send(result)
})
router.put('/:id',async(req,res)=>{
    const jobId = req.params.id;
    const result = await Job.findByIdAndUpdate(jobId,req.body,{ returnOriginal: false });
    return res.status(200).send(result);
})
router.delete('/:id',async(req,res)=>{
    const jobId = req.params.id;
    await Job.findByIdAndRemove(jobId);
    return res.status(200).send("Deleted Successfully");
})
router.get('/:id',async(req,res)=>{
    const doc_id = req.params.id;
    const result =  await Job.findById(doc_id);
    return res.status(200).send(result);
})
router.get('/user/:id',async(req,res)=>{
    const user_id = req.params.id;
    const result = await Job.find({user_uid:user_id})
    return res.status(200).send(result);
})
router.get('/category',async(req,res)=>{
    const result = await Job.find(req.body.category);
    return res.status(200).send(result);
})
module.exports = router;