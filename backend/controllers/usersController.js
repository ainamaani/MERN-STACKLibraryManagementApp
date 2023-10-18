const Student = require('../models/Students');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config()

//function to generate tokens
const generateToken = (_id) =>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'});
    
}

const signupUser = async (req,res)=>{
    const {fullname,studentnumber,email,course,isAdmin,contact,password} = req.body;
    try {
        const student = await Student.signup(fullname,studentnumber,email,course,isAdmin,contact,password)
        const token = generateToken(student._id);
        if(student){
             //create transporter to send emails via Gmail
             const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
            });

            //define email options
            const mailOptions = {
                from : 'AINAMAANI APP <aina.isaac2002@gmail.com>',
                to:'aina.isaac2002@gmail.com',
                subject:'MERN STACK',
                text:'Thank you for registering on the MERN stack Library App'
            };

            //Send the Email
            transporter.sendMail(mailOptions,function(error, info){
                if(error){
                    console.log(error)
                }else{
                    console.log('Email sent:' + info.response)
                }
            })
            res.status(200).json({token,student})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const student = await Student.login(email,password);
        const token = generateToken(student._id);
        if(student){
            res.status(200).json({token,email})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    signupUser,loginUser
}