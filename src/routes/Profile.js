import React, { useEffect, useState } from 'react';
import { getAuth, signOut, updateProfile } from "firebase/auth";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { authService } from '../firebase';

console.log(authService);

const Profile = ()=>{
  const user = authService.currentUser;

  //console.log(userObj); //uSISCGRRf1Uc3YpSuL4q7fsELLm1
  const profilePath = `${process.env.PUBLIC_URL}/profile_icon.svg`;
  const [profile, setProfile] = useState(profilePath);


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

  const updateLogo = async (e)=>{
    
    const file = e.target.files[0]; //업로드한 파일의 정보 확인
    const storage = getStorage(); //파일 업로드 관련 함수 초기화
    const storageRef = ref(storage, `profile/${user.uid}`); // 어디에(파일이 저장될 위치), 이름지정

    //업로드 함수
    const result = await uploadBytes(storageRef, file); //업로드 후 결과를 result에 할당

    const profileURL = await getDownloadURL(result.ref); //업로드 된 이미지의 절대경로를 profileURL에 할당

    console.log(profileURL);
    setProfile(profileURL); //새 이미지로 프로필 교체

    //사용자 프로필 업데이트
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      photoURL: profileURL
    });
  }
  
  useEffect(()=>{
    user.photoURL !== null && setProfile(user.photoURL);
  },[]) //최초한번 실행, 그리고 그 값이 변경되면 다시 실행
  
  return(
    <div className='container'>
      <h1>Profile Page</h1>
      <div className="profile">
        <img src={profile} alt=""/>
      </div>           
        <input type="file" className="hidden" accept="image/*" name="profile" id="profile" onChange={updateLogo} />    
        <label className="btn btn-primary" htmlFor="profile">프로필 이미지 변경</label>      
      <hr/>      
      <Button variant="primary" onClick={onLogoutClick}>로그아웃</Button>
    </div>
  )
}
export default Profile;