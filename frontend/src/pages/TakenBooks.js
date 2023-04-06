import React,{useState,useEffect} from 'react';
import TakenBooksDetails from '../components/TakenBooksDetails';
import useAuthContext from '../customHooks/useAuthContext';

const TakenBooks = () => {
    const {user} = useAuthContext()
    const [takenbooks,setTakenBooks]=useState([])

    useEffect(()=>{
        const fetchTakenBooks = async() =>{
            const response = await fetch('http://localhost:7000/api/books/bookstaken',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json()
            if(response){
                setTakenBooks(json)
            }
        }
        if(user){
            fetchTakenBooks()
        }
        
    },[user])
    return ( 
        <div className="taken-books">
            {takenbooks && takenbooks.map(takenbook =>{
                return(
                    <TakenBooksDetails key={takenbook._id} takenbook={takenbook}/>
                )
            })}
        </div>
     );
}
 
export default TakenBooks;