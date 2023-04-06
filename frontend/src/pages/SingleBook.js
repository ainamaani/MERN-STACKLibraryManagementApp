import React,{useState,useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';
import useAuthContext from '../customHooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const SingleBook = () => {
    const navigate = useNavigate()
    const {user} = useAuthContext()
    const regex = /^admin/
    const admin = regex.test(user.email)

    const [book,setBook] = useState({
        book:null
    })
    const {id} = useParams()
    useEffect(()=>{
        const fetchBook = async()=>{
            const response = await fetch(`http://localhost:7000/api/books/${id}`,{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()
            
            if(response.ok){
                setBook(json)
            }
        }
    
        fetchBook()
        
    },[])

    const borrowBook = async ()=>{
        const {_id,ISBN,title,author,edition,subject,college} = book;
        const borrowed = {_id,ISBN,title,author,edition,subject,college}
        try {
            const borrowedbook = fetch('http://localhost:7000/api/books/borrowed',{
                method: 'POST',
                body: JSON.stringify(borrowed),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${user.token}`
                }
            });
            navigate('/borrowed');
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const deleteBook =async()=>{
        const {_id} = book;
        const id = _id;
        try {
            const deletebook = fetch(`http://localhost:7000/api/books/delete/${id}`,{
                method: 'DELETE',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    return ( 
        <div className="single-book">
            <h4>{book.title}</h4>
            <p><strong>Author:</strong>{book.author}</p>
            <p><strong>Edition:</strong>{book.edition}</p>
            <p><strong>Collge:</strong>{book.college}</p>
            <p><strong>Book copies left:</strong>{book.copies}</p>
            {admin ? (
                <div>
                    <button className='del' onClick={deleteBook}>Delete book</button>
                    <Link to={`/updatebook/${book._id}`}>Update book</Link>
                    
                </div>
            ):(
                <div>
                    <button onClick={borrowBook}>Borrow</button>
                    
                </div>
            )}             
        </div>
     );
}
 
export default SingleBook;
