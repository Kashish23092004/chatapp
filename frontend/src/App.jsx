import { useAuth } from '../context/AuthProvider.jsx';
import { Routes, Route } from 'react-router-dom';
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
            <Signin />
          )
        }
      />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Signin />} />
    </Routes>
  );
}

export default App;
