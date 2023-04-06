const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    studentnumber:{
        type:Number,
        required:true,
        unique:true
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    course:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
        
    }

},{timestamps:true})

//static method to sign up students
studentSchema.statics.signup = async function(fullname,studentnumber,email,course,isAdmin,contact,password){

    if(!fullname || !studentnumber || !email || !course || !contact || !password){
        throw Error('Please fill in all the fields')
    }
    // if(contact.length != 10){
    //     throw Error('Please enter a valid telephone number')
    // }
    if(!validator.isEmail(email)){
        throw Error('Please enter a valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password entered is not strong enough')
    }


    const emailexists = await this.findOne({email})
    if(emailexists){
        throw Error('Student with that same email already exists')
    }
    const studentnumberexists = await this.findOne({studentnumber})
    if(studentnumberexists){
        throw Error('Student with that same student number already exists')
    }
    const contactexists = await this.findOne({contact})
    if(contactexists){
        throw Error('Student with that same contact already exists')
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const student = this.create({fullname,studentnumber,email,course,isAdmin,contact,password:hash})

    return student;
}

//static method for the login
studentSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error("Please fill in both fields");
    }
    const student = await this.findOne({email});
    if(!student){
        throw Error("A user with that email doesnot exist")
    }
    const match = await bcrypt.compare(password,student.password)
    if(!match){
        throw Error("Password entered is incorrect")
    }

    return student;
}


module.exports = mongoose.model('User',studentSchema)