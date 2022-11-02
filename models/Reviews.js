const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    job_id:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    student_id:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    stars:{
        type:Number,
        enum:[1,2,3,4,5],
        required:true
    }
})
const Review = mongoose.model('Review',reviewSchema)
module.exports = Review