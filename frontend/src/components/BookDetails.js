import React from 'react';
import {Link} from 'react-router-dom'
import useAuthContext from '../customHooks/useAuthContext';


const BookDetails = ({book}) => {
    const {user} = useAuthContext()
    const regex = /^admin/
    const admin = regex.test(user.email)
    return ( 
        <div className="single-book">
            <h4>{book.title}</h4>
            <p><strong>Author:</strong>{book.author}</p>
            <p><strong>Edition:</strong>{book.edition}</p>
            <p><strong>Collge:</strong>{book.college}</p>
            <p><strong>Book copies left:</strong>{book.copies}</p>
            { admin ? (
                <Link to={`/book/${book._id}`}>View book details</Link>
            ):( 
                 book.copies > 0 ? (
                    <Link to={`/book/${book._id}`}>Borrow book</Link>
                ):(
                    <h3>Book currently unavailable</h3>
                )
                
            )}
            
        </div>
    );
}
 
export default BookDetails;