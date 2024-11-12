import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Profile = ()=>{
  const navigate = useNavigate();
  const onLogoutClick = () =>{
    const auth = getAuth();

    signOut(auth).then(() => {
      // Sign-out successful.
      alert('로그아웃 되었습니다.');
      navigate('/');
    }).catch((error) => {
      // An error happened.
      alert(error);
    });
  }
  return(
    <div className='container'>
      <h1>Profile Page</h1>
      <div className="profile">
        <img src={`${process.env.PUBLIC_URL}/profile_icon.svg`} alt=""/>
      </div>           
        <input type="file" className="hidden" accept="image/*" name="profile" id="profile" />    
        <label className="btn btn-primary" htmlFor="profile" >프로필 이미지 변경</label>      
      <hr/>      
      <Button variant="primary" onClick={onLogoutClick}>로그아웃</Button>
    </div>
  )
}
export default Profile;