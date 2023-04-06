import React from 'react';
import { Link } from 'react-router-dom';
import useAuthContext from '../customHooks/useAuthContext';

const SingleSubjectDetails = ({singleSubject}) => {
    const {user} = useAuthContext()
    const regex = /^admin/
    const admin = regex.test(user.email)
    return ( 
        <div>
            <h2>{singleSubject.title}</h2>
            <h3>{singleSubject.author}</h3>
            { admin ? (
                <Link to={`/book/${singleSubject._id}`}>View book details</Link>
            ):( 
                 singleSubject.copies > 0 ? (
                    <Link to={`/book/${singleSubject._id}`}>Borrow book</Link>
                ):(
                    <h3>Book currently unavailable</h3>
                )
                
            )}
        </div>
     );
}
 
export default SingleSubjectDetails;