const Job = require("../models/Job");
const express = require('express');
const router = express.Router();
const validObjectId = require('../middleware/validObjectId')
const Notification = require('../models/Notification');

router.post('/',async(req,res)=>{
    const job = new Job(req.body);
    const result = await job.save()
    const notification = new Notification({
        nt_type:'success',
        title:'Job Uploaded',
        subtitle:`Your job ${req.body.title} is active now`,
        uid:req.body.uid
    })
    await notification.save() 
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
router.get('/:id',validObjectId,async(req,res)=>{
    const doc_id = req.params.id;
    const result =  await Job.findById(doc_id).populate('user_uid');
    return res.status(200).send(result);
})
router.get('/user/:id',async(req,res)=>{
    const user_id = req.params.id;
    const result = await Job.find({user_uid:user_id})
    return res.status(200).send(result);
})
router.get('/search/:query',async(req,res)=>{
    const query = req.params.query;
    const id = req.query.id;
    const regex = new RegExp(`.*${query}.*`)
    const result = await Job.find({uid:{$ne:id?id:null}})
                            .or([{title:{$regex:regex,$options:'i'}},{tags:{$in:query}}])
                            .select('title fees mode startingDate duration user_uid')
                            .populate('user_uid','name image rating')
    return res.status(200).send(result);
})
router.get('/duration/:duration',async(req,res)=>{
    const duration = req.params.duration;
    const id = req.query.id;
    const duration_possible = ['one','week','month','custom']
    if(!duration)
        return res.status(400).send("No duration specified")
    else if(!duration_possible.includes(duration))
        return res.status(400).send("Invalid Duration")
    const result = await Job.find({duration,uid:{$ne:id?id:null}})
                            .select('title fees mode startingDate duration user_uid')
                            .populate('user_uid','name image rating')
    return res.status(200).send(result);
})
module.exports = router;