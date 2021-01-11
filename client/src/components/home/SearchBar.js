import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FeedConsumer } from '../../providers/FeedProvider'
import useTrigger from '../../hooks/useTrigger';
import SearchIcon from '../../img/search_24px.svg';

const SearchBar = (props) => {
  const [ query, setQuery ] = useState("")

  useTrigger(props.query, 500, () => {
    if (props.hamburger) return;
    runSearch()
  });

  const runSearch = () => {
    if (props.categoryId) return;
    props.resetAndSearchPictures();
    props.setNoMorePictures(false)
    props.setQuerySearch(props.query)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.setQuery(query)
    runSearch()
    props.close()
  }

  return (
    <>
    { props.hamburger 
      ?
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            hamburger={true}
            type="text"
            name="formName"
            value={query}
            placeholder="Search..."
            onChange={(e) => {
              setQuery(e.target.value)
              props.setCategoryId(null)
            }}
            />
            <StyledButton> 
              <Icon src={SearchIcon} />
            </StyledButton>
        </StyledForm>
      :
        <StyledInput
          type="text"
          name="formName"
          value={props.query}
          placeholder="Find something new..."
          onChange={(e) => {
            props.setQuery(e.target.value)
            props.setCategoryId(null)
          }}
        />
    }
  </> 
  )
}
const StyledForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`
const Icon = styled.img`
  height: 1rem;
  width: 1rem;
  filter: invert(100);
`
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  background: #0099BA;
  // box-shadow: 0px 2px 10px rgba(0, 153, 186, 0.5);
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: 0.5rem;
`

const StyledInput = styled.input`
  border: none;
  height: ${props => props.hamburger ? "36px" : "30px"};
  width: ${props => props.hamburger ? "100vw" : "50vw"};
  box-sizing: border-box;
  outline: none;
  font-family: Montserrat;
  font-size: ${props => props.hamburger ? "16px" : "10px"};
  font-weight: 600;
  text-indent:10px;
  ::placeholder {
    line-height: normal;
    font-family: Montserrat;
    font-weight: 600;
    text-shadow: ${props => !props.hamburger && 
      "0px 2px 4px rgba(255, 255, 255, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.25)"};
    color: rgba(39, 39, 53, 0.75);
  }
`
const ConnectedSearchBar = (props) => (
  <FeedConsumer>
    {(value) => <SearchBar {...props} {...value} />}
  </FeedConsumer>
);

export default ConnectedSearchBar;