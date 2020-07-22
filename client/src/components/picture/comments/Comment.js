import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AuthConsumer } from '../../../providers/AuthProvider';
import deleteImg from '../../../img/delete.png';
import editImg from '../../../img/edit.jpg';

const Comment = (props) => {
  const userId = props.user_id
  const [userName, setUserName] = useState()
  const [userImage, setUserImage] = useState("https://images.unsplash.com/photo-1588948138600-bc75fd417834?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80")
  const [editing, setEditing] = useState(false)
  const [body, setBody] = useState(props.body)
  
  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(res => {
          setUserName(res.data.first_name + " " + res.data.last_name)
          setUserImage(res.data.image) 
      })
      .catch(console.log)
  }, [])

  const toggleEdit = (event) => {
    setEditing(!editing)
    if (editing) { handleSubmit(event) }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    axios.patch(`/api/picture_comments/${props.id}`, { body: body, user_id: userId, picture_id: props.pictureId })
      .then( res => {
        toggleEdit()
        setBody(res.data.body)
      })
      .catch(console.log)
  }
  
  const handleChange = (event) => {
    setBody(event.target.value)
  }

  const deleteComment = () => {
    const result = window.confirm("Delete Comment?")
    if (result) {
      axios.delete(`api/picture_comments/${props.id}`)
      .then( res => props.deleteCommentState(props.id))
    }
  }

  return (
    <Wrapper>
      <UserDiv>
        <Left>
          <a href={`/Profile/${props.user_id}`}>   
            <StyledUserImage image={userImage} />
            
          </a>
          <a href={`/Profile/${props.user_id}`}>   
            {userName}
          </a>
        </Left>
        <Right>
          {props.authenticated ? 
            <>
              {props.user.id === userId ? 
                  <>
                    <EditButton onClick={toggleEdit} image={editImg}/>
                    <DeleteButton onClick={deleteComment} image={deleteImg} />
                  </>
                : null
              }
            </>
          : null }
        </Right>
      </UserDiv>
      <BodyDiv>
        {editing ?
          <>
            <form onSubmit={handleSubmit}>
              <input name="comment" type="text" value={body} onChange={handleChange}>
              </input>
            </form>
          </>
        :
          <>
            {body}
          </>
        }
      </BodyDiv>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding-top: 2rem;
  font-size: 12px;
`
const UserDiv = styled.div`
  display: flex;
  height: 45px;
  justify-content: space-between;
  font-size: 14px;
  
`
const Left = styled.div`
  display: flex;
  flex-direction: row;
  a:link {
    color: black;
  }
  a:visited {
    color: black;
  }
  a:hover {
    color: black;
  }
  a:active {
    color: black;
  }
`
const Right = styled.div`
  display: flex;
  justify-content: right;
`
const EditButton = styled.div `
background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  height: 30px;
  width: 30px;  
  cursor: pointer;
`
const DeleteButton = styled.div `
background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  height: 30px;
  width: 30px;  
  cursor: pointer;
`
const StyledUserImage = styled.div `
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  height: 30px;
  width: 30px;  
`
const BodyDiv = styled.div`
  background: #F4F4F4;
  padding-botton: 1rem;
  display: flex;
  width: 40rem;
  padding: 8px;
  margin: -8px;
  font-size: 12px;

`

const ConnectedComment = (props) => (
  <AuthConsumer>
    {(value) => <Comment {...props} {...value} />}
  </AuthConsumer>
);

export default ConnectedComment;