import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import BookForm from "./pages/BookForm"
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Books from "./pages/Books";
import SingleBook from "./pages/SingleBook";
import BorrowedBooks from "./pages/BorrowedBooks";
import SingleBorrowedBook from "./pages/SingleBorrowedBook"
import TakenBooks from "./pages/TakenBooks";
import SingleTakenBook from "./pages/SingleTakenBook";
import ReturnedBooks from "./pages/ReturnedBooks";
import SignUpForm from "./pages/signup";
import LogInForm from "./pages/login";
import UpdateBookForm from "./pages/UpdateBookForm";
import useAuthContext from "./customHooks/useAuthContext";
import SingleCategory from "./components/Subject";


function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/addbook"
              element={
                // user ? <BookForm/> : <Navigate to={"/login"}/>
                <BookForm/>
              }
            />
            <Route exact path="/books"
              element={
                // user ? <Books/> : <Navigate to={"/login"}/>
                <Books/>
              }
            />
            <Route path="/book/:id"
              element={
                // user ? <SingleBook/> : <Navigate to={"/login"}/>
                <SingleBook/>
              }
            />
            <Route exact path="/borrowed"
              element={
                // user ? <BorrowedBooks/> : <Navigate to={"/login"}/>
                <BorrowedBooks/>
              }
            />
            <Route path="/borrowed/:id"
              element={
                // user ? <SingleBorrowedBook/> : <Navigate to={"/login"}/>
                <SingleBorrowedBook/>
              }
            />
            <Route path="/taken"
              element={
                // user ? <TakenBooks/> : <Navigate to={"/login"}/>
                <TakenBooks/> 
              }
            />
            <Route path="/taken/:id"
              element={
                // user ? <SingleTakenBook/> : <Navigate to={"/login"}/>
                <SingleTakenBook/>
              }
            />
            <Route path="/returned"
              element={
                // user ? <ReturnedBooks/> : <Navigate to={"/login"}/>
                <ReturnedBooks/>
              }
            />
            <Route path="/signup"
                element={
                // !user ?  <SignUpForm/> : <Navigate to={"/books"}/>
                <SignUpForm/>
                }
            />
            <Route path="/login"
                element={
                // !user ?  <LogInForm/> : <Navigate to={"/books"}/>
                <LogInForm/>
                }
            />
            <Route path="/updatebook/:id" 
                element={
                <UpdateBookForm/>
                }
            />
            <Route path="/boooks/:subject"
                element={
                <SingleCategory/>
                }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
