import React,{useEffect,useState} from 'react';
import BookDetails from '../components/BookDetails';
import { UseBookContext } from '../customHooks/useBooksContext'
import useAuthContext from '../customHooks/useAuthContext'
import { Link } from 'react-router-dom';
// import SearchFunctionality from '../components/Search';

const Books = () => {
    const{books,dispatch}=UseBookContext()
    const {user} = useAuthContext();

    const [searchQuery,setSearchQuery]=useState('');
    const [searchResults,setSearchResults] = useState([]);

    const handleSearch =(e)=>{
        const results = books.filter(book=> book.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setSearchResults(results)

    }

    useEffect(()=>{
        const getBooks = async ()=>{
            const response = await fetch('http://localhost:7000/api/books',{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_BOOKS',payload:json})
            }
        }  
        if(user){
            getBooks() 
        }    
    },[dispatch,user])

    return ( 
        <div>
             <div>
                <input type="text" placeholder='Search by title' 
                onChange={(e)=>{setSearchQuery(e.target.value)}} value={searchQuery}
                />
                <button onClick={handleSearch}>Search</button>
             </div>
             <div className="categories">
                {books && books.map(book =>(
                    <Link to={`/boooks/${book.subject}`} >{book.subject}</Link>
                ))}
             </div>
            <div className="books">
            {searchResults.length > 0 ? 
            (searchResults && searchResults.map(book => <BookDetails key={book._id} book={book} />)) :
            (books && books.map(book => <BookDetails key={book._id} book={book} />))
            }
            </div>
        </div>
     );
}
 
export default Books;