import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import useTrigger from '../../hooks/useTrigger'
import { CollectionsContext } from '../../providers/CollectionsProvider';

const CollectionsSearchBar = (props) => {
  const context = useContext(CollectionsContext)

  useTrigger(context.query, 500, () => {
    
    context.resetAndSearchCollections();
    context.setNoMorePictures(false)
    // props.setQuerySearch(props.query)
  });

  return (
    <StyledInput
      type="text"
      name="formName"
      value={context.query}
      placeholder="Find something new, bud..."
      onChange={(e) => {
        context.setQuery(e.target.value)
        // props.setCategoryId(null)
      }}
    />
  )
}

const StyledInput = styled.input`
  border: none;
  height: 30px;
  width: 50vw;
  box-sizing: border-box;
  outline: none;
  font-family: Montserrat;
  font-size: 10px;
  font-weight: 600;
  text-indent:10px;
  ::placeholder {
    font-family: Montserrat;
    font-weight: 600;
    text-shadow: 0px 2px 4px rgba(255, 255, 255, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.25);
    color: rgba(39, 39, 53, 0.75);
  }
`


export default CollectionsSearchBar;