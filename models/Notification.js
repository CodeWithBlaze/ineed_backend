const mongoose = require('mongoose');
const notificationSchema = mongoose.Schema({
    nt_type:{
        type:String,
        enum:['success','fail','info','custom'],
        required:true
    },
    title:{
        type:String,
        max:200,
        required:true,
    },
    subtitle:{
        type:String,
        max:200,
        required:true
    },
    uid:{
        type:String,
        required:true,
    }
})
const Notification = mongoose.model('Notification',notificationSchema);
module.exports = Notification;