import React,{useState,useEffect} from 'react';
import { Navigate, useParams} from 'react-router-dom';
import useAuthContext from '../customHooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const SingleBorrowedBook = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const regex = /^admin/
    const admin = regex.test(user.email)
    const [borrowedbook,setBorrowedBook]=useState({
        borrowedbook:null
    })
    const {id} = useParams()
    useEffect(()=>{
        const fetchBorrowedBook = async()=>{
            const response = await fetch(`http://localhost:7000/api/books/borrowed/${id}`,{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                setBorrowedBook(json)
            }
        }
        if(user){
            fetchBorrowedBook()
        } 
    })
    const bookTaken = async()=>{
        const {_id} = borrowedbook;
        const id = _id;

        const takenbook = await fetch(`http://localhost:7000/api/books/taken/${id}`,{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
            
        })
        if(takenbook){
            navigate('/taken');
        }
    }
    const datee= parseInt(borrowedbook.bookdate);
    const bookdate = new Date(datee).toLocaleString();

    // let future = new Date(datee).getTime();
    // let futureTime = datee + 3600000;
    // var countdown = setInterval(()=>{
    //     let now = datee
    //     now -= 1000;
    //     console.log(now)
    //     let timeLeft = futureTime - now;
    //     // console.log(timeLeft)
    //     if(timeLeft>0){
    //         let days = Math.floor(timeLeft/(1000*60*60*24));
    //         let hours = Math.floor((timeLeft%(1000*60*60*24))/(1000*60*60));
    //         let minutes = Math.floor((timeLeft%(1000*60*60))/(1000*60));
    //         let seconds = Math.floor((timeLeft%(1000*60))/1000);
        
            
    //         document.getElementById('days').innerHTML = formatTime(days)
    //         document.getElementById('hours').innerHTML = formatTime(hours)
    //         document.getElementById('minutes').innerHTML = formatTime(minutes)
    //         document.getElementById('seconds').innerHTML = formatTime(seconds)
    //     }  
        

    // },5000)

    // function formatTime(time){
    //     return time<10 ? `0${time}` : time
    // }
    return ( 
        <div className="borrowed-book">
            <h4>{borrowedbook.title}</h4>
            <p><strong>Author:</strong>{borrowedbook.author}</p>
            <p><strong>Edition:</strong>{borrowedbook.edition}</p>
            <p><strong>College:</strong>{borrowedbook.college}</p>
            {admin ? (
                <div>
                    <button onClick={bookTaken}>Confirm book pickup</button>
                    
                </div>
            ):(
                <h3>Please pick the book within an hour</h3>
            )}
            {/* <p>{bookdate}</p>
            <div class="timer">
            <div>
                <p id="days">00</p>
                <span>Days</span>
            </div>
            <div>
                <p id="hours">00</p>
                <span>Hours</span>
            </div>
            <div>
                <p id="minutes">00</p>
                <span>Minutes</span>
            </div>
            <div>
                <p id="seconds">00</p>
                <span class="sec">Seconds</span>
            </div>
            </div> */}
            
        </div>
     );
}
 
export default SingleBorrowedBook;