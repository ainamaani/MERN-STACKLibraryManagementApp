import React from 'react';
import {Link} from 'react-router-dom'

const BorrowedBookDetails = ({borrowedbook}) => {
    return ( 
        <div className="borrowed-book">
            <h4>{borrowedbook.title}</h4>
            <p><strong>Author:</strong>{borrowedbook.author}</p>
            <p><strong>Edition:</strong>{borrowedbook.edition}</p>
            <p><strong>College:</strong>{borrowedbook.college}</p>
            <Link to={`/borrowed/${borrowedbook._id}`}>View details</Link>

        </div>
     );
}
 
export default BorrowedBookDetails;