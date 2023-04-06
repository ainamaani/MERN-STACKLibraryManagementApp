import {useContext} from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw Error('You do not have access to this context so you cant use it')
    }
    return context;
}
 
export default useAuthContext;
