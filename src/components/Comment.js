import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';



const Comment = ({commentObj, isOwener})=>{
  const [edit, setEdit] = useState(false); //수정모드 구분
  const [comment, setComment] = useState(commentObj.comment); //초기값은 기존 입력글



  //console.log(commentObj); 문서이름찾기
  const deleteComment = async ()=>{
    const deleteConfirm = window.confirm('정말 삭제할까요?');
    if(deleteConfirm){
      await deleteDoc(doc(db, "comments", commentObj.id));
    }
  }

  const toggleEditMode = ()=>{
    setEdit(prev=>!prev); //기존의 값의 반대
  }

  const onChange = (e)=>{
    // let value = e.target.value;
    const {target:{value}} = e;
    setComment(value);
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
    const commentRef = doc(db, "comments", commentObj.id);

    await updateDoc(commentRef, {
      comment : comment
    });
    setEdit(false);    
  }


  return(
    <ListGroup.Item>
      <div className="d-flex justify-content-between">
        {edit ?  
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="comment">          
              <Form.Control type="text" value={comment} onChange={onChange} placeholder="글을 입력해주세요" />
            </Form.Group>
            <div className="d-flex gap-2 justify-content-start">
            <Button type="button" variant="secondary" onClick={toggleEditMode} size="sm">취소</Button>
            <Button type="submit" variant="primary" size="sm">입력</Button>
            </div>
          </Form>
        
        : 
       (
        <>
          {commentObj.comment}
          {isOwener && 
            <div className="d-flex gap-2">
              <Button variant="warning" onClick={toggleEditMode} size="sm">수정</Button>
              <Button variant="danger" onClick={deleteComment} size="sm">삭제</Button>
            </div>
          } 
        </>
       ) 
      }
      </div>
      
    </ListGroup.Item>
  )
}
export default Comment;