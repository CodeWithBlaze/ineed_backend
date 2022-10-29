const express = require('express')
const router = express.Router()
const Notification = require('../models/Notification')
router.get('/:id',async (req,res)=>{
    const id = req.params.id
    const result = await Notification.find({uid:id})
    return res.status(200).send(result)
})
router.post('/',async (req,res)=>{
    const {type,title,subtitle,uid} = req.body
    const notification = new Notification({
        nt_type:type,
        title,
        subtitle,
        uid
    })
    const result = await notification.save()
    return res.status(200).send(result)
})
module.exports = router;