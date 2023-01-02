import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { config } from './Authentiaction/auth.config';
import AuthLogin from './Authentiaction/AuthLogin';
import { AuthRoute } from './Authentiaction/AuthRouting';
import { Dashboard } from './Modules/Dashboard/Index';
import { ExpensePage } from './Modules/ExpensePage';
import './App.css'
import Header from './Components/Header';
import AuthContext from './Authentiaction/auth-context';
initializeApp(config.firebaseConfig);

function App() {
  const authContex = useContext(AuthContext);
  const {isLoggedIn} = authContex;
  console.log(authContex)
  console.log('app',isLoggedIn)
  const uid = localStorage.getItem('uid');

  return (
    <div className="App">
      <Header title='Expense Tracker'  />
      <Routes>
        {<Route path='/' element={
          uid ? <AuthRoute><Dashboard  /></AuthRoute> : <Navigate to={'/login'} />} />}
        { !uid && <Route path='/login' element={
          <AuthLogin />
        } />}
        <Route path='/expense/:id' element={
          uid ? 
          <AuthRoute><ExpensePage /></AuthRoute> : <Navigate to={'/login'} />
        }
        />
        <Route path='*' element={ !uid ? <Navigate to={'/login'} /> :  <Navigate to={'/'} />} />
      </Routes>
    </div>
  );
}

export default App;
