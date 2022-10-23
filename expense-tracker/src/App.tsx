import React from 'react';
import { Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { config } from './Authentiaction/auth.config';
import AuthLogin from './Authentiaction/AuthLogin';
import { AuthRoute } from './Authentiaction/AuthRouting';
import Home from './Home';
// AuthRouting
initializeApp(config.firebaseConfig);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <AuthRoute><Home /></AuthRoute>} />
        <Route path='/login' element={
          <AuthRoute><AuthLogin /></AuthRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
