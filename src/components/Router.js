import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

//로그인 전/후비교해서 다른페이지 보여주기
const AppRouter = ()=>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Routes>
      {isLoggedIn? 
      <Route path="/" element={<Home/>} /> 
      : 
      <Route path="/" element={<Auth/>} />
      }
      
      
    </Routes> 
  )
}
export default AppRouter;