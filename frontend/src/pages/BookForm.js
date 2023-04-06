import React,{useState} from 'react';
import Links from '../components/Links';
import useAuthContext from '../customHooks/useAuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const BookForm = () => {
    const [title,setTitle]=useState('');
    const [ISBN,setISBN]=useState('');
    const [author,setAuthor]=useState('');
    const [edition,setEdition]=useState('');
    const [subject,setSubject]=useState('');
    const [college,setCollege]=useState('');
    const [copies,setCopies] = useState('');
    const {user} = useAuthContext()

    const handleSubmit= async(e)=>{
        e.preventDefault()
        if(!user){
            return
        }
        const bookDetails = {title,ISBN,author,edition,subject,college,copies}
        try {
            const response = await fetch('http://localhost:7000/api/books',{
                method: 'POST',
                body: JSON.stringify(bookDetails),
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${user.token}`
                }
                
            })
            if(response.ok){
                setTitle('');
                setISBN('');
                setAuthor('');
                setEdition('');
                setSubject('');
                setCollege('');
                setCopies('');
                toast.success('Book added successfully!', {
                    position: 'top-right'
                  });

            }
        } catch (error) {
            console.log(error)
        }

        // console.log(title,author,edition,subject,college)
    }
    
    return ( 
        <div className="form-links">
            <div className="addBook">
                <form className='create' onSubmit={handleSubmit}>
                    <h3>Add a new book</h3>
                    <label>Book title</label>
                    <input type="text" placeholder='Book title'
                    onChange={(e)=>{setTitle(e.target.value)}} value={title}
                    />
                    <label>ISBN</label>
                    <input type="text" placeholder='ISBN'
                    onChange={(e)=>{setISBN(e.target.value)}} value={ISBN}
                    />
                    <label>Book author</label>
                    <input type="text" placeholder='Book author'
                    onChange={(e)=>{setAuthor(e.target.value)}} value={author}
                    />
                    <label>Book edition</label>
                    <input type="number" placeholder='Book edition'
                    onChange={(e)=>{setEdition(e.target.value)}} value={edition}
                    />
                    <label>Subject</label>
                    <input type="text" placeholder='Subject'
                    onChange={(e)=>{setSubject(e.target.value)}} value={subject}
                    />
                    <label>College</label>
                    <input type="text" placeholder='College'
                    onChange={(e)=>{setCollege(e.target.value)}} value={college}
                    />
                    <label>Book copies</label>
                    <input type="number" placeholder='Book copies'
                    onChange={(e)=>{setCopies(e.target.value)}} value={copies}
                    />
                    <button>Add new book</button>
                </form>
            </div>
            <Links/>
        </div>
        
        
     );
}
 
export default BookForm;