import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FeedConsumer } from '../../providers/FeedProvider'
import useTrigger from '../../hooks/useTrigger'

const NavSearchBar = (props) => {
  
  useTrigger(props.query, 500, () => {
    if (props.categoryId) return;
    props.resetAndSearchPictures();
    props.setNoMorePictures(false)
    props.setQuerySearch(props.query)
  });

  return (
  <>
    <StyledInput
      type="text"
      name="formName"
      value={props.query}
      placeholder="Find something new . . ."
      onChange={(e) => {
        props.setQuery(e.target.value)
        props.setCategoryId(null)
      }}
    />
    <StyledInputMediaLg
      type="text"
      name="formName"
      value={props.query}
      placeholder="Find something..."
      onChange={(e) => {
        props.setQuery(e.target.value)
        props.setCategoryId(null)
      }}
    />
    <StyledInputMediaSm
      type="text"
      name="formName"
      placeholder="Search..."
      value={props.query}
      onChange={(e) => {
        props.setQuery(e.target.value)
        props.setCategoryId(null)
      }}
    />
  </>
  )
}

const StyledInput = styled.input`
  border: none;
  height: 35px;
  width: 10rem;
  box-sizing: border-box;
  outline: none;
  font-family: Montserrat;
  ::placeholder {
    
    font-family: Montserrat;
    color: black;
  }
  @media only screen and (max-width: 599px) { 
    display: none;
  }
`
const StyledInputMediaLg = styled.input`
  border: none;
  height: 35px;
  width: 8rem;
  box-sizing: border-box;
  outline: none;
  font-family: Montserrat;
  ::placeholder {
    // text-align: right;
    font-family: Montserrat;
    color: black;
  }
  @media (min-width: 600px) { 
    display: none;
  }
  @media (max-width: 449px) { 
    display: none;
  }
`
const StyledInputMediaSm = styled.input`
  border: none;
  height: 35px;
  width: 6rem;
  box-sizing: border-box;
  outline: none;
  font-family: Montserrat;
  ::placeholder {
    text-align: center;
    font-family: Montserrat;
    color: black;
  }
  @media only screen and (min-width: 450px) { 
    display: none;
  }
`
const ConnectedNavSearchBar = (props) => (
  <FeedConsumer>
    {(value) => <NavSearchBar {...props} {...value} />}
  </FeedConsumer>
);

export default ConnectedNavSearchBar;