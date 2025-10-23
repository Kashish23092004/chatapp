import { useAuth } from '../context/AuthProvider.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import Mainchat from './components/Mainchat.jsx';
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';
import React from 'react';

function App() {
  const { authUser } = useAuth();
  console.log("auth user in App.jsx:", authUser);

  return (
    <Routes>
      <Route
        path='/'
        element={
          authUser ? (
            <div>
              <Mainchat />
            </div>
          ) : (
            <Navigate to={'/login'}/>
          )
        }
      />
      <Route path='/signup' element={authUser  ? <Navigate to='/' /> : <Signup />} />
      <Route path='/login' element={authUser  ? <Navigate to='/' /> : <Signin />} />
    </Routes>
  );
}

export default App;
