const mongoose = require('mongoose');
const User = require('./Students')

const returnedBooksSchema = new mongoose.Schema({
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
    returndate:{
        type:String,
        required:true
    },
    fine:{
        type:Number,
        required:false
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    username:{
        type:String,
        required:false
    },
    userstudentnumber:{
        type:Number,
        required:false
    }

},{timestamps:true})

module.exports = mongoose.model('returnedBooks',returnedBooksSchema);