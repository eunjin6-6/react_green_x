import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { doc, deleteDoc } from "firebase/firestore";

const deleteComment = ()=>{
  const deleteComfirm = window.confirm('정말 삭제할까요?')
}

const Comment = ({commentObj, isOwener})=>{
  return(
    <ListGroup.Item>
      <div className="d-flex justify-content-between">
        {commentObj.comment}
        {isOwener && 
          <div className="d-flex gap-2">
            <Button variant="secondary" size="sm">수정</Button>
            <Button variant="danger" onClick={deleteComment} size="sm">삭제</Button>
          </div>
        } 
      </div>
      
    </ListGroup.Item>
  )
}

export default Comment;