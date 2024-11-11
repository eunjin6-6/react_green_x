import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppRouter from './Router';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false); //로그인 확인 시작 여부
  const [userObj, setUserObj] = useState(null); //객체정보가 비어있는 초기값일때는 null

  useEffect(()=>{
  const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //유저 정보가 있다면-> Router에 전달해서 home
        setIsLoggedIn(true);
        //console.log(user);
        setUserObj(user.uid);
      } else {
        //없다면 -> Router에 전달해서 login
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])

  return (
    <>
      {init ? <AppRouter userObj={userObj} isLoggedIn={isLoggedIn} />: "Initializing..." }
    </>
  );
}

export default App;
