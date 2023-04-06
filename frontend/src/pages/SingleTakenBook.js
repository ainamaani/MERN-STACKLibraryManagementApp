import React,{useEffect,useState} from 'react';
import { useParams,Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../customHooks/useAuthContext';


const SingleTakenBook = () => {
    const navigate = useNavigate()
    const {user} = useAuthContext()
    const regex = /^admin/
    const admin = regex.test(user.email)

    const [booktaken,setBookTaken]=useState({
        booktaken:null
    })
    const {id} = useParams();
    useEffect(()=>{
        const fetchBookTaken = async()=>{
            const response = await fetch(`http://localhost:7000/api/books/taken/${id}`,{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                setBookTaken(json)
            }
        }
        if(user){
            fetchBookTaken()
        }  
    },[user])
    const bookReturned = async()=>{
        const {_id} = booktaken;
        const id = _id;
        const bookreturn = await fetch(`http://localhost:7000/api/books/returned/${id}`,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        })
        if(bookreturn){
            navigate('/returned');
        }
    }
    const datee = parseInt(booktaken.pickupdate);
    const pickupdate = new Date(datee).toLocaleString()
    

    return ( 
        <div className="taken-book">
            <h4>{booktaken.title}</h4>
            <p> <strong>Author:</strong> {booktaken.author}</p>
            <p> <strong>Edition:</strong> {booktaken.edition}</p>
            <p> <strong>College:</strong> {booktaken.college}</p>
            <p> <strong>Pickup date:</strong> {booktaken.pickupdate}</p>
            {admin ? (
                <div>
                    <button onClick={bookReturned}>Confirm book return</button>
                    {/* <Navigate to={'/returned'} /> */}
                </div>
            ):(
                <h3>Book taken on this date</h3>
            )}
            
        </div>
     );
}
 
export default SingleTakenBook;