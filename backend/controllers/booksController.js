const Book = require('../models/Book');
const BorrowedBook = require('../models/BorrowedBooks');
const TakenBook = require('../models/TakenBooks');
const ReturnedBook = require('../models/ReturnedBooks');
const User = require('../models/Students')
const fineFunction = require('../logicFunctions/fineFunction');
const mongoose = require('mongoose');


const getBooks = async (req,res)=>{
    try {
        const books = await Book.find({}).sort({createdAt: -1})
        if(books){
            res.status(200).json(books)
        }
        else{
            res.status(400).json({error:'Cannot fetch the books from db'})
        }   
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const addBook = async(req,res)=>{

    const {title,ISBN,author,edition,subject,college,copies} = req.body;
    try {

        const book = await Book.create({title,ISBN,author,edition,subject,college,copies})
        if(book){
            res.status(200).json(book)
        }else{
            res.status(400).json({error:'Book has failed to be added to the db'})
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const getBook = async(req,res) =>{
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(400).json({error:'A book with such an id does not exist'})
        }
        const singleBook = await Book.findById(id)
        if(singleBook){
            res.status(200).json(singleBook)
            console.log(singleBook)
        }
        else{
            res.status(400).json({error:'Could not fetch the requested book'})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

const getBorrowed = async (req,res)=>{
    const user_id = req.user._id;
    const loggedinuser = await User.findById({_id:user_id})
    const regex = /^admin/
    const admin = regex.test(loggedinuser.email)
    
    try {
        let borrowedbooks;
        if (admin){
            borrowedbooks = await BorrowedBook.find({}).sort({createdAt:-1})
        }else{
            borrowedbooks = await BorrowedBook.find({user_id}).sort({createdAt:-1})
        }
        
        if(borrowedbooks){
            res.status(200).json(borrowedbooks)
        }else{
            res.status(400).json({error:'Could not fetch all books'})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const addBorrowed = async (req,res)=>{
    const {_id,ISBN,title,author,edition,subject,college} = req.body;

    try {
        const user_id = req.user._id;
        const borrower = await User.findById(user_id);
        const borrowedbook = await BorrowedBook.create({title,ISBN,author,edition,subject,college,
        bookdate : Date.now().toString(),user_id,username : borrower.fullname,
        userstudentnumber : borrower.studentnumber
        })
        const copiesleft = await Book.findById(_id);
        if(copiesleft){
            copiesleft.copies -= 1;
            await copiesleft.save();
        }
        if(borrowedbook){
            res.status(200).json(borrowedbook)

        }else{
            res.status(400).json({error:'Could not add the borrowed book'})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getSingleBorrowed = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:"A borrowed book with such an id does not exist"})
    }
    try {
        const singleborrowedbook= await BorrowedBook.findById(id);
        if(singleborrowedbook){
            res.status(200).json(singleborrowedbook)
        }else{
            res.status(400).json({error:"Could not fetch that borrowed book"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const addTaken =async(req,res)=>{

    const {id} =  req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:"A book with such an id does not exist"})
    }
    try {
        const user_id = req.user._id;
        const deleted = await BorrowedBook.findByIdAndDelete(id)
        const {title,ISBN,author,edition,subject,college,username,userstudentnumber} = deleted;
        const response = await TakenBook.create({title,ISBN,author,edition,subject,college,
        pickupdate : Date.now().toString(),user_id,username,userstudentnumber
        })
        if(response){
            res.status(200).json(response)
        }else{
            res.status(400).json({error:'Could not add taken book'})
        }

    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

const getTaken = async(req,res)=>{
    const user_id = req.user._id;
    const loggedinuser = await User.findById({_id:user_id})
    const regex = /^admin/
    const admin = regex.test(loggedinuser.email)
    try {
        let takenbooks;
        if(admin){
            takenbooks = await TakenBook.find({ }).sort({createdAt:-1})
        }else{
            takenbooks = await TakenBook.find({ user_id }).sort({createdAt:-1})
        }
        if(takenbooks){
            res.status(200).json(takenbooks)
        }else{
            res.status(400).json({error:'Could not fetch the taken books unfortunately'})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getSingleTaken = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:'Such an id for a taken book does not exist'})
    }
    try {
        const singlebooktaken = await TakenBook.findById(id)
        if(singlebooktaken){
            res.status(200).json(singlebooktaken)
        }else{
            res.status(400).json({error:'Could not fetch the taken book requested'})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const addReturned = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:'No such id'})
    }
    try {
        const user_id = req.user._id;
        const deleted = await TakenBook.findByIdAndDelete(id);
        const {title,ISBN,author,edition,subject,college,fine,username,userstudentnumber} = deleted;

        const returned = await ReturnedBook.create({title,ISBN,author,edition,subject,college,fine,
        returndate : Date.now().toString(),user_id,username,userstudentnumber
        
        });
        const updatecopies = await Book.findOne({ISBN:ISBN})
        if(updatecopies){
            updatecopies.copies += 1;
            await updatecopies.save();
            console.log(updated)
        }
        
        if(returned){
            res.status(200).json(returned);
           
        }else{
            res.status(400).json({error:'Could not add returned book'})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getReturned = async(req,res)=>{
    const user_id = req.user._id;
    const loggedinuser = await User.findById({_id:user_id})
    const regex = /^admin/
    const admin = regex.test(loggedinuser.email)
    // const {id} = req.params;
    // if(!mongoose.Types.ObjectId.isValid()){
    //     res.status(400).json({error:'Such an id is not valid'})
    // }
    try {
        let returned;
        if(admin){
            returned = await ReturnedBook.find({ }).sort({createdAt: -1})
        }else{
            returned = await ReturnedBook.find({ user_id }).sort({createdAt: -1}) 
        }
        if(returned){
            res.status(200).json(returned)
        }else{
            res.status(400).json({error: 'Could not fetch returned books'})
        }
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deleteBook = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:'Such an id for a taken book does not exist'})
    }
    try {
        const deleted = await Book.findByIdAndDelete(id);
        if(deleted){
            res.status(200).json(deleted);
        }else{
            res.status(400).json({error: 'Could not delete the book'});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}

const updateBook = async(req,res)=>{
    const {id} = req.params;
    const updatedFields = req.body;
    try {
        const updatebook = await Book.findByIdAndUpdate(id,updatedFields,{new : true})
        if(updatebook.ok){
            res.status(200).json(updatebook);
        }else{
            res.status(400).json({error: 'Could not update book as requested'});
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

const getCategory = async(req,res)=>{

    const {subject} = req.params;
    try {
        const categorybooks = await Book.find({"subject":subject});
        if(categorybooks){
            res.status(200).json(categorybooks)
            console.log(categorybooks);
        }else{
            res.status(400).json({error: "Could not fetch books of that category"})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getBooks,
    addBook,
    getBook,
    getBorrowed,
    addBorrowed,
    getSingleBorrowed,
    addTaken,
    getTaken,
    getSingleTaken,
    addReturned,
    getReturned,
    deleteBook,
    updateBook,
    getCategory
}

