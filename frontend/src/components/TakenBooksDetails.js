import React from 'react';
import { Link } from 'react-router-dom';
const TakenBooksDetails = ({takenbook}) => {

    return ( 
        <div className="taken-book">
            <h4>{takenbook.title}</h4>
            <p> <strong>Author:</strong> {takenbook.author}</p>
            <p> <strong>Edition:</strong> {takenbook.edition}</p>
            <p> <strong>College:</strong> {takenbook.college}</p>
            <Link to={`/taken/${takenbook._id}`} >View details</Link>
        </div>
     );
}
 
export default TakenBooksDetails;