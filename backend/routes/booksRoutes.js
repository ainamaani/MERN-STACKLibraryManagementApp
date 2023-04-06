const express = require('express');
const router = express.Router();
const {getBooks,addBook,getBook,addBorrowed,
    getBorrowed,getSingleBorrowed,
    addTaken,getTaken,getSingleTaken,addReturned,
    getReturned,deleteBook,updateBook,getCategory} = require('../controllers/booksController')


const requireAuth = require('../middleware/requireAuth')

//fire middleware for all in coming requires for books
router.use(requireAuth)

router.get('/',getBooks)

router.post('/',addBook)

router.get('/borrowed',getBorrowed)

router.post('/borrowed',addBorrowed)

router.get('/bookstaken',getTaken)

//currently on getting all returned books
router.get('/returned',getReturned)

router.get('/:id',getBook)

router.post('/taken/:id',addTaken)

router.get('/borrowed/:id',getSingleBorrowed)

router.get('/taken/:id',getSingleTaken)

router.post('/returned/:id',addReturned)

router.delete('/delete/:id',deleteBook)

router.patch('/update/:id',updateBook)

router.get('/category/:subject',getCategory)









module.exports = router