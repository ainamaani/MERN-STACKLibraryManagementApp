import {useState} from 'react';
import useAuthContext from './useAuthContext';

const useLogIn = () => {
    const[error,setError]=useState(null);
    const[isLoading,setIsLoading]=useState(null);
    const {dispatch} = useAuthContext()

    const login = async(email,password)=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:7000/api/user/login',{
            method: 'POST',
            body: JSON.stringify({email,password}),
            headers: {
                'Content-Type':'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setIsLoading(false)
        }
        if(response.ok){
            //save user to local storage
            localStorage.setItem('user',JSON.stringify(json))

            //update the auth context
            dispatch({type:'LOGIN',payload:json})
            setIsLoading(false)

        }
    }
    //return sign up function,isLoading property and the error such that 
    //they can be grabbed from the custom hook
    return {login,isLoading,error}
}
 
export default useLogIn;