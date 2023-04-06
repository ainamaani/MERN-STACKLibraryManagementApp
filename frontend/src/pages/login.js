import React,{useState} from 'react';
import useLogIn from '../customHooks/useLogin';
import { useNavigate } from 'react-router-dom';

const LogInForm = () => {
    const navigate = useNavigate()
    const [email,setEmail]=useState('');
    const [password,setPassword] = useState('');
    const {login,error,isLoading} = useLogIn();


    const userLogin = async (e) =>{
        e.preventDefault();
        await login(email,password);
        navigate('/books')
        
        
    }
    return ( 
        <form className='login' onSubmit={userLogin}>
            <h3>Login</h3>
            <label>Email</label>
            <input type="email" placeholder='Email'
            onChange={(e)=>{setEmail(e.target.value)}} value={email}
            />
            <label>Password</label>
            <input type="password" placeholder='Password'
            onChange={(e)=>{setPassword(e.target.value)}} value={password}
            />
            <button disabled={isLoading}>Log in</button>
            {error && <div className='error'>{error}</div> }
        </form>
     );
}
 
export default LogInForm;