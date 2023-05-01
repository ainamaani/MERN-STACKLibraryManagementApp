const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config()
const bookRoutes = require('./routes/booksRoutes')
const userRoutes = require('./routes/usersRoutes')
const TakenBook = require('./models/TakenBooks')
const BorrowedBook = require('./models/BorrowedBooks')
const cors = require('cors')


//middleware
app.use(express.json())
app.use(cors())
app.use((req,res,next)=>{
    console.log(req.method,req.path,req.body)
    next()
})
app.use('/api/books',bookRoutes);
app.use('/api/user',userRoutes);

//configure deployment
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    })
}

//connect to db
mongoose.connect(process.env.dbURI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log('Listening for requests now')
        })
    })
    .catch((err)=>{
        console.log(err)
    })

//DELETE BOOKS AFTER A CERTAIN TIME
function bookingExpiry(){
    BorrowedBook.find()
        .then((result)=>{
           for(i=0; i < result.length; i++){
            if((Date.now().toString()) - result[i].bookdate > 3600000){
                const id = result[i]._id
                BorrowedBook.findByIdAndDelete(id)
                    .then((result)=>{
                        console.log("Deleted")
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                
            }
           }
        })
        .catch((err)=>{
            console.log(err)
        })
}
setInterval(bookingExpiry,5000)

//FINE FUNCTION
// function calculateFine(){
//     TakenBook.find({})
//         .then((result)=>{
//             for(b=0; b < result.length; b++){
//                 let days= Date.now().toString() - result[b].pickupdate
//                 //5 hours and 8 hours
//                 if(days >= 18000000 && days <= 28800000){
//                     const id = result[b]._id
//                     TakenBook.updateOne(
//                         {"_id": id},
//                         {$set : {"fine":5000}}
//                         )
//                         .then((result)=>{
//                             console.log(result)
//                         })
//                         .catch((err)=>{
//                             console.log(err)
//                         })
//                 //8 hours and 12 hours
//                 }else if(days > 28800000 && days <= 43200000){
//                     const id = result[b]._id
//                     TakenBook.updateOne(
//                         {"_id": id},
//                         {$set : {"fine":15000}}
//                         )
//                         .then((result)=>{
//                             console.log(result)
//                         })
//                         .catch((err)=>{
//                             console.log(err)
//                         })
//                 //above 12 hours
//                 }else if(days > 43200000){
//                     const id = result[b]._id
//                     TakenBook.updateOne(
//                         {"_id": id},
//                         {$set : {"fine":50000}}
//                         )
//                         .then((result)=>{
//                             console.log(result)
//                         })
//                         .catch((err)=>{
//                             console.log(err)
//                         })
//                 }   
//             }
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
//     }
    
// setInterval(calculateFine,5000)