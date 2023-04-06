import { Link } from "react-router-dom";
const Links = () => {
    return ( 
        <div className="page-links">
            <h4>Page Links</h4>
            <ul>
                <li><Link className="all" to={"/books"}>ALL books</Link></li>
                <li><Link className="booked" to={"/borrowed"}>Booked books</Link></li>
                <li><Link className="picked" to={"/taken"}>Picked books</Link></li>
                <li><Link className="returnedd" to={"/returned"}>Returned books</Link></li>
            </ul>
        </div>
     );
}
 
export default Links;