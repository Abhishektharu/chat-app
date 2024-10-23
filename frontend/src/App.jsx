import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/Signup'
import { Toaster } from "react-hot-toast";
function App() {

  return (
   <div className='p-4 h-screen flex items-center justify-center'>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
    </Routes>
    </BrowserRouter>

    <Toaster/>
   </div>
  )
}

export default App
