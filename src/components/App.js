import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppRouter from './Router';
import { authService } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

console.log(authService);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false); //로그인 확인 시작 여부

  useEffect(()=>{
  const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //유저 정보가 있다면-> Router에 전달해서 home
        setIsLoggedIn(true);
      } else {
        //없다면 -> Router에 전달해서 login
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} />: "Initializing..." }
    </>
  );
}

export default App;
