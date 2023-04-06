import {useState} from 'react';
import  useAuthContext  from './useAuthContext';

const useSignUp = () => {
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (fullname,studentnumber,email,contact,course,password)=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:7000/api/user/signup',{
            method: 'POST',
            body: JSON.stringify({fullname,studentnumber,email,contact,course,password}),
            headers : {
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setIsLoading(false)
        }
        if(response.ok){
            //save student to the local storage
            localStorage.setItem('student',JSON.stringify(json))
            //update the auth context
            dispatch({type:'LOGIN',payload: json})
            setIsLoading(false)
        }
    }
    //return sign up function,isLoading property and the error such that 
    //they can be grabbed from the custom hook
    return {signup,isLoading,error}
    
}
 
export default useSignUp;
