import React, {useState, useEffect}  from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CollectionHeader = (props) => (
  <Wrapper>
    <HeaderColumn>
      <HeaderDiv>
        <HeaderTitle>{props.collection.title}</HeaderTitle>
        <HeaderName to={`/profile/${props.user.id}`}><BySpan>by</BySpan> {props.user.first_name + " " + props.user.last_name}</HeaderName>
      </HeaderDiv>
      <HeaderDescription>{props.collection.description}</HeaderDescription>
    </HeaderColumn>
    <ImageDiv>
      <a href={`/profile/${props.user.id}`}>
        <UserImage user={props.user} />
      </a>
    </ImageDiv>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 75vw;
  min-height: 350px;
  display: flex;
  margin: 0 auto 0 auto;
  justify-content: space-between;
  align-items: center;
`
const HeaderDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
`
const HeaderTitle = styled.h1`
  font-weight: 600;
  font-size: 50px;
  margin-bottom: 0;
  line-height: 0.8em;
`
const HeaderColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
`
const BySpan = styled.span`
  color: black;
`
const HeaderName = styled(Link)`
  margin-left: 25px;
  align-self: flex-end;
  font-size: 14px;
`
const ImageDiv = styled.div`
  display-flex;
  justify-content: flex-start;
`
const HeaderDescription = styled.p`
 color: black;
 line-height: 2rem;
 font-size: 14px;
`
const UserImage = styled.div`
  background-image: url(${props => props.user.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 15rem;
  height: 15rem;
  border-radius: 100%;
`

export default CollectionHeader;