import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit , onSnapshot} from "firebase/firestore"; 
import ListGroup from 'react-bootstrap/ListGroup';
import Comment from '../components/Comment';
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';



const Home = ({userObj})=>{
  const [comment, setComment] = useState(''); //입력하는 글 정보
  const [comments, setComments] = useState([]); //조회된 글 정보들, 배열(리스트)
  const [attachment, setAttachment] = useState('');

  //파일업로드 참조만들기
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();

  // Create a storage reference from our storage service
  const storageRef = ref(storage);



  //글 리스트 조회
  const getComments = async()=>{
     /*
    const q = query(collection(db, "comments"), orderBy("date", "desc"), limit(5));
    const querySnapshot = await getDocs(q);
   
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const commentObj = {
        ...doc.data(),
        id:doc.id
      }
      //기존배열(prev)풀어헤치고, 넣어주기
      setComments(prev=>[commentObj, ...prev]);
    });
    배열만 먼저 만들어주고, 한방에 넣는걸로 변경
    
    //const commentArr = querySnapshot.docs.map(doc=>{return{...doc.data(), id:doc.id}})
    const commentArr = querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id}))
    setComments(commentArr);
    */

    //작성 시 실시간 반영
    const q = query(collection(db, "comments"), orderBy("date", "desc"), limit(5));
    onSnapshot(q, (querySnapshot) => {
      const commentArr = querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id}))
      setComments(commentArr);
});
  }
  //console.log(comments);

  useEffect(()=>{
    getComments();
  },[]) //최초 렌더링 후 실행, 변동시 실행
  
  const onChange = (e)=>{
    // let value = e.target.value;
    const {target:{value}} = e;
    setComment(value);
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
    //console.log(comment, '실행');

    //파일첨부
    const storageRef = ref(storage, `${userObj}/${uuidv4()}`);

    //파일 업로드
    uploadString(storageRef, attachment, 'data_url').then(async (snapshot) => {
      //console.log('파일 업로드 완료!');
      //console.log(await getDownloadURL(storageRef)); //업로드한 이미지 경로 확인

      const imageURL = await getDownloadURL(storageRef);

      try{
        await addDoc(collection(db, "comments"), {
          comment:comment,
          date: serverTimestamp(),
          uid: userObj,
          image: imageURL
        });
        document.querySelector('#comment').value='';
        setAttachment('');
      }
      catch(e){
        console.log("Document written with ID: ", e);
      }
    });



  }

  const onFileChange = (e)=>{
    //console.log(e.target.files[0]);//첨부파일 정보 확인 1
    const theFile = e.target.files[0];
    const reader = new FileReader();
    
    /*
    reader.addEventListener(
      "load", //3
      (e) => {
        console.log(e.target.result);
      },
      false,
    );
    아래 onloadend로 줄이기
    */

    reader.onloadend = (e) => {
      console.log(e.target.result);
      setAttachment(e.target.result);
    }


    if (theFile) { //첨부한 이미지가 있다면 2-1
      reader.readAsDataURL(theFile); //데이터를 읽고2-2
    }

  }

  const onClearFile = ()=>{
    setAttachment(null);
    document.querySelector('#formFileSm').value = '';
  }

  return(
    <div className="container">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="comment">          
          <Form.Control type="text" onChange={onChange} placeholder="글을 입력해주세요" />
        </Form.Group>
        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label>이미지</Form.Label>
          <Form.Control type="file" accept="image/*" size="sm" onChange={onFileChange}/>
        </Form.Group>
        {attachment && <div className='mb-3'>
          <img src={attachment} alt="" width="100"/>
          <Button type="button" variant="secondary" size="sm" onClick={onClearFile}>취소</Button>
        </div>}
        <Button type="submit" variant="primary">입력</Button>
      </Form>
      <hr/>
      <ListGroup>
        {comments.map(item=>
          <Comment key={item.id} commentObj={item} isOwener={item.uid === userObj}/>
        )}
      </ListGroup>  
    </div>
  );
}
export default Home;