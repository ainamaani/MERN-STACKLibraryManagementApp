import React,{useState,useEffect} from 'react';
import { Navigate, useParams} from 'react-router-dom';
import useAuthContext from '../customHooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const SingleBorrowedBook = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const regex = /^admin/
    const admin = regex.test(user.email)
    const [borrowedbook,setBorrowedBook]=useState({
        borrowedbook:null
    })
    const {id} = useParams()
    useEffect(()=>{
        const fetchBorrowedBook = async()=>{
            const response = await fetch(`http://localhost:7000/api/books/borrowed/${id}`,{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                setBorrowedBook(json)
            }
        }
        if(user){
            fetchBorrowedBook()
        } 
    })
    const bookTaken = async()=>{
        const {_id} = borrowedbook;
        const id = _id;

        const takenbook = await fetch(`http://localhost:7000/api/books/taken/${id}`,{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
            
        })
        if(takenbook){
            navigate('/taken');
        }
    }
    const datee= parseInt(borrowedbook.bookdate);
    const bookdate = new Date(datee).toLocaleString();

    return ( 
        <div className="borrowed-book">
            <h4>{borrowedbook.title}</h4>
            <p><strong>Author:</strong>{borrowedbook.author}</p>
            <p><strong>Edition:</strong>{borrowedbook.edition}</p>
            <p><strong>College:</strong>{borrowedbook.college}</p>
            {admin ? (
                <div>
                    <button onClick={bookTaken}>Confirm book pickup</button>
                    
                </div>
            ):(
                <h3>Please pick the book within an hour</h3>
            )}
           
        </div>
     );
}
 
export default SingleBorrowedBook;