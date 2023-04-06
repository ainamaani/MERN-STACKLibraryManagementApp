import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useAuthContext from '../customHooks/useAuthContext';
import SingleSubjectDetails from '../pages/SingleSubject';
const SingleCategory = () => {
    const {user} = useAuthContext()
    const regex = /^admin/
    const admin = regex.test(user.email)
    const {subject} = useParams();
    const [singleSubjects,setSingleSubjects] = useState([]);

    useEffect(()=>{
        const fetchCategory = async()=>{
            const categoryBooks = await fetch(`http://localhost:7000/api/books/category/${subject}`,{
                method: 'GET',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            });
            const json = await categoryBooks.json();
            setSingleSubjects(json);

        }
        fetchCategory()
    },[subject,user.token])
    return ( 
        <div className='singleCategory'>
            <h2>Single Category</h2>
            {singleSubjects.length === 0 ? (
                <h4>Loading.....</h4>
            ):(
                singleSubjects.map(singleSubject=> (
                    // <h5 key={singleSubject._id}>{singleSubject.title}</h5>
                    <SingleSubjectDetails key={singleSubject._id} singleSubject={singleSubject} />
                ))
            )}
        </div>
     );
}
 
export default SingleCategory;