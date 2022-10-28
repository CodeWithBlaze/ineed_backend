const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer')
const cors = require('cors')
const utils = require('./utils/custom');


const User = require('./routes/User')
const Job = require('./routes/Job');
app.use(cors())
app.use(express.static('image'))
app.use(multer({storage:utils.fileStorage,fileFilter:utils.fileFilter}).single('image'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/user',User);
app.use('/job',Job);
app.get('/',(req,res)=>{
    return res.status(200).send("This response is from ineed app server")
})

mongoose.connect('mongodb://localhost/ineed').then(()=>{
    console.log('conected to mongodb database');
    app.listen(3000,()=>console.log("Listening on port 3000"))
}).catch(()=>{
    console.log(err=>console.log(err.message));
})
