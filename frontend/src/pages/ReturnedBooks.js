import React,{useEffect,useState} from 'react';
import ReturnedBooksDetails from '../components/ReturnedBooksDetails';
import useAuthContext from '../customHooks/useAuthContext';

const ReturnedBooks = () => {
    const {user} = useAuthContext()
    const[returnedbooks,setReturnedBooks]=useState([])
    useEffect(()=>{
        const fetchReturned = async()=>{
            const response = await fetch('http://localhost:7000/api/books/returned',{
                headers: {
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                setReturnedBooks(json)
            }
        }
        fetchReturned()
    })
    
    return ( 
        <div className="returned">
            {returnedbooks && returnedbooks.map(returnedbook=>{
                return(
                    <ReturnedBooksDetails key={returnedbook._id} returnedbook={returnedbook}/>
                )
            })}
        </div>
     );
}
 
export default ReturnedBooks;