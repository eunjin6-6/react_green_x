import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const Auth = ()=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);

  const auth = getAuth();

  const onChange =(e)=>{
  //console.log(e.target.name);

  // const email = e.target.name //email
  // const password = e.target.name //password
  // const evalue = e.target.email //email에 입력한 값
  // const pvalue = e.target.password //password에 입력한 값

    /*
  setEmail(e.target.email);
  setPassword(e.target.password);
  */

 
  // const passwordvalue = e.target.password //password
  /*
  if(e.target.name === 'email'){
    setEmail(e.target.email);
  } else if (e.target.name === 'password'){
    setPassword(vale.target.password);
  }
  아래 변수이용
  */
  const {target:{name, value}} = e; //비구조할당
  if(name === 'email'){
    setEmail(value);
  } else if (name === 'password'){
    setPassword(value);
  }

  }
  

  const onSubmit = (e)=>{
    e.preventDefault();
    if(newAccount){
      //회원가입
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // 계정생성(회원가입) 완료 후 할일
        const user = userCredential.user; //생성된 계정의 유저정보 확인
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
    } else{
      //로그인
    }
  }


  return(
    <div className="container">
      <h1 className="my-3">{newAccount ? '회원가입' : '로그인'}</h1>
      <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="loginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" onChange={onChange} placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="loginPw">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" onChange={onChange} />
      </Form.Group>
      <Button type="submit" variant="primary">Login</Button>
    </Form>
    </div>
  )
}

export default Auth