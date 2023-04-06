import React,{useEffect, useState} from 'react';
import Links from '../components/Links';
import { useParams } from 'react-router-dom';
import useAuthContext from '../customHooks/useAuthContext';


const UpdateBookForm = () => {
    const {id} = useParams();
    const [title,setTitle]=useState('');
    const [ISBN,setISBN]=useState('');
    const [author,setAuthor]=useState('');
    const [edition,setEdition]=useState('');
    const [subject,setSubject]=useState('');
    const [college,setCollege]=useState('');
    const [copies,setCopies] = useState('');
    const {user} = useAuthContext()
    const [initialdata,setInitialData] = useState({});

    useEffect(()=>{
        const fetchInitialData =async()=>{
            const initial = await fetch(`http://localhost:7000/api/books/${id}`,{
                method: 'GET',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const initialdata = await initial.json();
            setInitialData(initialdata)
            setTitle(initialdata.title);
            setAuthor(initialdata.author);
            setISBN(initialdata.ISBN);
            setEdition(initialdata.edition);
            setSubject(initialdata.subject);
            setCollege(initialdata.college);
            setCopies(initialdata.copies);
        }
        fetchInitialData()
    },[id,user])

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const changedFields = {};
        if(title !== initialdata.title){
            changedFields.title = title;
        }
        if(author !== initialdata.author){
            changedFields.author = author;
        }
        if(ISBN !== initialdata.ISBN){
            changedFields.ISBN = ISBN;
        }
        if(edition !== initialdata.edition){
            changedFields.edition = edition;
        }
        if(subject !== initialdata.subject){
            changedFields.subject = subject;
        }
        if(college !== initialdata.college){
            changedFields.college = college;
        }
        if(copies !== initialdata.copies){
            changedFields.copies = copies;
        }

        const updated = fetch(`http://localhost:7000/api/books/update/${id}`,{
            method: 'PATCH',
            body: JSON.stringify(changedFields),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        if(updated.ok){
            setInitialData();
            setTitle();
            setAuthor();
            setISBN();
            setEdition();
            setSubject();
            setCollege();
            setCopies();
        }
        
    }
    
    return ( 
        <div className="form-links">
            <div className="addBook">
                <form className='create' onSubmit={handleSubmit}>
                    <h3>Update {title}</h3>
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
                    <button>Update book details</button>
                </form>
            </div>
            <Links/>
        </div>
        
        
     );
}
 
export default UpdateBookForm;