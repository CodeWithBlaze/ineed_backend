const ObjectId = require('mongoose').Types.ObjectId
function validObjectId(req,res,next){
    const id = req.params.id;
    if(!id)
        return res.status(400).send("No ID found")
    else if(!ObjectId.isValid(id))
        return res.status(400).send("Not a valid id")
    else
        next()
}   
module.exports = validObjectId;