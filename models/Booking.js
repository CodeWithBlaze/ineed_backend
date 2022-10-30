const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    student_id:{
        type:String,
        require:true
    },
    job_id:{
        type:mongoose.Types.ObjectId,
        require:true
    },
    valid_up_to:{
        type:Date,
        require:true
    }
})

const Booking = mongoose.model('booking',bookingSchema);
module.exports = Booking;