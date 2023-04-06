import React,{useState,useEffect} from 'react';
import BorrowedBookDetails from '../components/BorrowedBookDetails';
import useAuthContext from '../customHooks/useAuthContext';

const BorrowedBooks = () => {
    const {user} = useAuthContext()
    const[borrowedbooks,setBorrowedBooks]=useState([])

    const [searchQuery,setSearchQuery]=useState('');
    const [searchResults,setSearchResults] = useState([]);

    const handleSearch =(e)=>{
        const results = borrowedbooks.filter(borrowedbook=> borrowedbook.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setSearchResults(results)

    }

    useEffect(()=>{
        const fetchBorrowedBooks = async()=>{
            const response = await fetch('http://localhost:7000/api/books/borrowed',{
                headers:{
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                setBorrowedBooks(json)
            }
        }
        if(user){
            fetchBorrowedBooks()
        } 
    },[user])
    return ( 
        <div>
            <div>
            <input type="text" placeholder='Search by title' 
            onChange={(e)=>{setSearchQuery(e.target.value)}} value={searchQuery}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
        <div className="booked">
            
            {searchResults.length > 0 ? 
            (searchResults && searchResults.map(borrowedbook => <BorrowedBookDetails key={borrowedbook._id} borrowedbook={borrowedbook} />)) :
            (borrowedbooks && borrowedbooks.map(borrowedbook => <BorrowedBookDetails key={borrowedbook._id} borrowedbook={borrowedbook} />))
            }
            
        </div>
        </div>
     );
}
 
export default BorrowedBooks;