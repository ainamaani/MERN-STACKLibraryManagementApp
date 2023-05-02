import { Link } from "react-router-dom";
import useLogout from "../customHooks/useLogout";
import useAuthContext from "../customHooks/useAuthContext";

const Navbar = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()
    const handleLogout = ()=>{
        logout()
    }

    return ( 
        <header>
            <div className="container">
                <h1>Library Management System.</h1>
                {!user && (
                    <div>
                        <Link to={"/signup"}>Sign up</Link>
                        <Link to={"/login"}>Log in</Link>
                    </div>
                )}
                {user && (
                <div>
                    <span>{user.email}</span>
                    <button onClick={handleLogout}>Log out</button>
                </div>
                )}
            </div>
        </header>   
    );
}
 
export default Navbar;