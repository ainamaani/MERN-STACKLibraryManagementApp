const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ISBN:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    edition:{
        type:Number,
        required:false
    },
    subject:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    copies:{
        type:Number,
        required:true,
    }

}, {timestamps:true})

module.exports = mongoose.model('book',bookSchema);