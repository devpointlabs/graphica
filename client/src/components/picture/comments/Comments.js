 import React from 'react';
 import NewComment from './NewComment'
 import Comment from './Comment'
 import styled from 'styled-components'

const Comments = (props) => (
  <FeedbackDiv>
    <Flex>
      <InfoLeft>
        Feedback
      </InfoLeft>
      <InfoRight>
        {props.comments.length} 
        {props.comments.length !== 1 ? " responses" : " response" }
      </InfoRight>
    </Flex>
    <NewComment id={props.pictureId} setStatePictureShow={props.setStatePictureShow} />
    <CommentsDiv>
      {props.comments.map((comment, index) => (
        <>
          <Comment toggle={props.toggle} key={comment.id} {...comment} deleteCommentState={props.deleteCommentState}/>
        </>
      ))}
    </CommentsDiv>
  </FeedbackDiv>
)

const FeedbackDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 2rem;
`
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const InfoRight = styled.div`
`
const InfoLeft = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
  padding-bottom: 1rem;
`
const CommentsDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
`
export default Comments