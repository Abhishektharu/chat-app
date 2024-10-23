import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/Signup'
import { Toaster } from "react-hot-toast";
import { UseAuthContext } from "./context/AuthContext";
function App() {

    // usecontext to verify the login || authUser
    const {authUser} = UseAuthContext();
  return (

   <div className='p-4 h-screen flex items-center justify-center'>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={authUser ? <Home /> : <Navigate to = '/login' />}></Route>
      <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />}></Route>
      <Route path='/signup' element={authUser ? <Navigate to= '/' /> : <SignUp />}></Route>
    </Routes>
    </BrowserRouter>

    <Toaster/>
   </div>
  )
}

export default App
