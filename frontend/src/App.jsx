import { useState } from 'react'
import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Mainchat from './components/Mainchat.jsx'
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path = '/' element = {<Mainchat/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/login' element = {<Signin/>}/>
    </Routes>
    </>
  )
}

export default App
