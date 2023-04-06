import React from 'react';
const ReturnedBooksDetails = ({returnedbook}) => {
    const datee = parseInt(returnedbook.returndate);
    const returndate = new Date(datee).toLocaleString();
    return ( 
        <div className="returned-book">
            <h4>{returnedbook.title}</h4>
            <p>{returnedbook.author}</p>
            <p>{returnedbook.edition}</p>
            <p>{returnedbook.college}</p>
            <p>{returndate}</p>
            <p>{returnedbook.fine}</p>
            <p>{returnedbook.username}</p>
        </div>
     );
}
 
export default ReturnedBooksDetails;