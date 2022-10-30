const multer = require("multer")
var uniqid = require('uniqid'); 
const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'image')
    },
    filename:(req,file,cb)=>{
        cb(null,uniqid()+"-"+file.originalname)
    }
})
const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
function extractDateFromTimeStamp(dt){
    const date = new Date(dt);
    return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
}
module.exports = {
    fileStorage,
    fileFilter,
    extractDateFromTimeStamp
}