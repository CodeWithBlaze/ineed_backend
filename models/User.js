const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        default:'',
    },
    description:{
        type:String,
        default:'',
    },
    image:{
        type:String,
        default:''
    },
    profession:{
        type:String,
        default:''
    },
    rating:{
        type:Number,
        default:0,
    },
    uid:{
        type:String,
        required:true
    }
})
const User = mongoose.model('User',userSchema);
module.exports = User;