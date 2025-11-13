import React from 'react'
import Hero from './components/Hero'
import { Routes, Route } from 'react-router-dom'
import Jaap from './components/Jaap'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login  from './components/Login'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ForgotPasswordPopup from './components/ForgetPasswordPopup'
const App = () => {

  return (
   <>
  <Navbar/>
 <Routes>
        <Route path='/' element={  <Hero/>} />
        <Route path='/Jaap' element={<Jaap/>}/>
        <Route path='/signup' element={<Signup/>}/>
       <Route path='/login' element={<Login/>}/>
 <Route path="/forget-password" element={<ForgotPasswordPopup />} />     
  
     <Route path='/dashboard' element={ 
       <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>}/>



        </Routes>     
 
   </>
  )
}

export default App
