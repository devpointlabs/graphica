import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import styled from 'styled-components'
import { FeedConsumer } from '../../providers/FeedProvider'
import { ConfigContext } from '../../App';

const Catbar = (props) => {
  const [cats, setCats] = useState([])

  const context = useContext(ConfigContext);

  useEffect(() => {
    axios.get("/api/categories")
      .then( res => {
        shuffleArray(res.data)
      })
      .catch(console.log)
  }, [])

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    setCats(array)
  }

  const handleClick = (category) => {
    props.setCategoryId(category.id)
    props.categorySearch(category.id)
    props.setQuerySearch(`${category.title} Category`)
    props.setQuery("")
  }
  
  return (
    <>{context.showCatbar && 
      <Wrapper>
          <Scroll>
          <Spacer></Spacer>
          {cats.map(cat => (
            <>
              <LinkDiv isCurrentCat={ cat.id === props.categoryId } onClick={()=>handleClick(cat)}> {cat.title} </LinkDiv><Spacer></Spacer>
            </>
          ))}
          </Scroll>
      </Wrapper>           
    }</>
  )  
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  background: rgba(200, 200, 200, 0.75);
  width: 100%;
  padding: 6px;
  top: 3rem;
  z-index: 1;
  box-shadow: 0 2px 2px rgba(0,0,0,0.25);
`
const Scroll = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  
  scrollbar-width: none;  
  flex-shrink: 0;
`
const Spacer = styled.div`
  width: 40px;
  flex-shrink: 0;
`
const LinkDiv = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: ${props => props.isCurrentCat ? "black" : "white"};
  cursor: pointer;
  text-shadow: 0px -2px 4px rgba(255, 255, 255, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.25);
`

const ConnectedCatbar = (props) => (
  <FeedConsumer>
    {(value) => <Catbar {...props} {...value} />}
  </FeedConsumer>
);

export default ConnectedCatbar;