import React,{useState} from 'react';
import useSignUp from '../customHooks/useSignup';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const navigate = useNavigate()
    const [fullname,setFullname]=useState('');
    const [studentnumber,setStudentnumber]=useState('');
    const [email,setEmail]=useState('');
    const [course,setCourse]=useState('');
    const [contact,setContact]=useState('');
    const [password,setPassword]=useState('');
    const {signup,isLoading,error} = useSignUp()

    const userSignup = async(e) =>{
        e.preventDefault();
        await signup(fullname,studentnumber,email,course,contact,password);
        navigate('/login');
        
    }
    
    return ( 
        <form className='signup' onSubmit={userSignup}>
            <h3>Sign Up</h3>
            <label>Full name</label>
            <input type="text" placeholder='Full name'
            onChange={(e)=>{setFullname(e.target.value)}} value={fullname}
            />
            <label>Student Number</label>
             <input type="number" placeholder='Student number'
            onChange={(e)=>{setStudentnumber(e.target.value)}} value={studentnumber}
            />
            <label>Email</label>
             <input type="email" placeholder='Email'
            onChange={(e)=>{setEmail(e.target.value)}} value={email}
            />
            <label>Course</label>
             <input type="text" placeholder='Course'
            onChange={(e)=>{setCourse(e.target.value)}} value={course}
            />
            <label>Contact</label>
             <input type="text" placeholder='Contact'
            onChange={(e)=>{setContact(e.target.value)}} value={contact}
            />
            <label>Password</label>
             <input type="password" placeholder='Password'
            onChange={(e)=>{setPassword(e.target.value)}} value={password}
            />
            <button disabled={isLoading}>Sign up</button>
            {error && <div className='error'>{error}</div> }
        </form>
    );
}
 
export default SignUpForm;