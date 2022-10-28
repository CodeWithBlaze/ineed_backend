const express = require('express')
const router = express.Router();
const User = require('../models/User')

router.post('/',async (req,res)=>{
    const uid = req.body.uid;
    if(!uid)
        return res.status(400).send("No UID found")
    const user = new User({
        uid
    })
    const result = await user.save();
    return res.status(200).send(result); 
})
router.post('/image/:id',async(req,res)=>{
    const uid = req.params.id;
    const file = req.file;
    if(!file)
        return res.status(400).send("Unsupported File")
    const updatedProfile = await User.findOneAndUpdate({uid:uid},{$set:{image:file.filename}},{returnOriginal:false})
    return res.status(200).send(updatedProfile)
})
router.put('/:id',async (req,res)=>{
    const uid = req.params.id;
    const updateFields = req.body.updateFields;
    if(!updateFields) return res.status(400).send("No Fields Specified")
    const updatedProfile = await User.findOneAndUpdate({uid:uid},{$set:updateFields},{returnOriginal:false})
    return res.status(200).send(updatedProfile);
})
router.get('/:id',async(req,res)=>{
    const uid = req.params.id;
    const user = await User.findOne({uid:uid})
    return res.status(200).send(user);
})
module.exports = router;