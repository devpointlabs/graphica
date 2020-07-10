import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PictureComments from './PictureComments'
import CommentBar from './CommentBar';

const PictureShow = (props) => {
  const id = props.id;
  const url = props.url;
  const user = props.user;
  const description = props.description;
  const title = props.title;
  const catId = props.category_id
  const [catName, setCatName] = useState("");
  const [comments, setComments] = useState([]);

  
  useEffect(() => {
    axios.get(`/api/categories/${catId}`)
    .then(res => {
      setCatName(res.data.title)
    })
    .catch(console.log)
    axios.get(`/api/pictures/${id}/picture_comments`)
    .then(res => { setComments(res.data) })
      .catch(console.log)      
      
  }, [])

  return (
   <Wrapper>
      <UserInfoDiv>
        UserPic
        <NameDiv>
          {user.first_name}
        </NameDiv>
        <EmailDiv>
          {user.email}
        </EmailDiv>
      </UserInfoDiv>
      <PictureDiv>
        <StyledImg src={url} />
      </PictureDiv>
      <PictureInfoDiv>
        <InfoLeft>{title}</InfoLeft>
        <InfoRight>part of <a href="url">such and such</a> collection</InfoRight> 
      </PictureInfoDiv>
      <PictureCollectionDiv>
        Hello Picture Collection 
      </PictureCollectionDiv>
      <PictureDescriptionDiv>
        <InfoLeft>
        Description
        </InfoLeft>
        <InfoRight>
        in <a href="url">{catName}</a> category

        </InfoRight>
      </PictureDescriptionDiv>
        <Description>{description} </Description>
      
      <CommentsDiv>
        <InfoLeft>
          Feedback
        </InfoLeft>
        <InfoRight>
          {comments.length} 
          {comments.length != 1 ? " responses" : " response" }
          
        </InfoRight>
        <Rectangle>
          <CommentBar id={id}/>
        </Rectangle>
        {comments.map((comment, index) => (
          <>
            <PictureComments key={comment.id} {...comment}/>
          </>
        ))}
      </CommentsDiv>
   </Wrapper>
  )
}
//Ready for some styling fail?

const Wrapper = styled.div`
  
  
 
`
const NameDiv = styled.div`
  font-size: 18px;
`
const EmailDiv = styled.div`
  color: gray;
`
const UserInfoDiv = styled.div`
  position: relative;
  left: 50px;
`
const PictureDiv = styled.div`
  width: 50%;
  
`
const StyledImg = styled.img`
  height: 400px;
`
const PictureInfoDiv = styled.div`
  
  height: 30px;
`
const InfoRight = styled.div`
  position: relative;  
  float: right;
  top: -17px;
`
const InfoLeft = styled.div`
  font-weight: bold;
  font-size: 24px;

`
const PictureCollectionDiv = styled.div`
  position: relative;
  top: 75px;
  left: 100px;
  height: 150px;

`
const PictureDescriptionDiv = styled.div`
 
`
const Description = styled.div`
  margin: 30px;
`

const CommentsDiv = styled.div`
  width: 80%;
`
const Rectangle = styled.div`
  position: relative;
  left: 18.42%;
  top: 50%;
  width: 708px;
  height: 35.24px;
  background-color: white;
  border-style: solid;
  
`

export default PictureShow







