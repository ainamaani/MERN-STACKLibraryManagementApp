import useAuthContext from "./useAuthContext";
import { UseBookContext }  from "./useBooksContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate()
    const {dispatch} = useAuthContext()
    const { dispatch:booksDispatch } = UseBookContext()
    const logout = () =>{
        //delete item from localStorage
        localStorage.removeItem('user')

        //update the global state
        dispatch({type:'LOGOUT'})
        booksDispatch({type:'SET_BOOKS',payload:null})

        //redirect user to the login page
        navigate('/login')
    }
    
    return {logout}
}
 
export default useLogout;