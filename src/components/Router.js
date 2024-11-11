import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Nav from './Nav';
import Profile from '../routes/Profile';

//로그인 전/후비교해서 다른페이지 보여주기
const AppRouter = ({isLoggedIn, userObj})=>{
  return (
    <>
    {isLoggedIn && <Nav />}
    <Routes>
      {isLoggedIn?
      <> 
      <Route path="/" element={<Home userObj={userObj} />} /> 
      <Route path="/profile" element={<Profile />} /> 
      </>
      : 
      <Route path="/" element={<Auth/>} />
      }
    </Routes>
    </> 
  )
}
export default AppRouter;