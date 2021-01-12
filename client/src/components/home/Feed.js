import React, { useState, useEffect } from 'react';
import Card from './Card';
import styled from 'styled-components';
import { FeedConsumer } from '../../providers/FeedProvider';
import useRenderColumns from '../../hooks/useRenderColumns';
import FeedColumns from '../feed/FeedColumns';

const Feed = (props) => {
  const [isFetching, setIsFetching] = useState(true);
  const { columnArrays, renderColumns } = useRenderColumns();
  const [ columnCount, setColumnCount ] = useState(3)
  const [ width, setWidth ] = useState(1000)
  
  window.onresize = () => handleResize()

  const handleResize = () => {
    let newWidth = window.innerWidth
    if (width < 1000 && newWidth > 999) {
      setColumnCount(3)
      // renderColumns(props.pictures, 3)
    } else if (width > 699 && newWidth < 700) {
      setColumnCount(1)
      // renderColumns(props.pictures, 1)
    } else if (width > 999 && newWidth < 1000 || width < 700 && newWidth > 699) {
      setColumnCount(2)
      // renderColumns(props.pictures, 2)
    }
    setWidth(window.innerWidth)
  }
  
  const findColumnCount = (width) => {
    if (width > 999) {
      setColumnCount(3)
    } else if (width < 1000 && width > 699) {
      setColumnCount(2)
    } else {
      setColumnCount(1)
    }
  }

  useEffect(() => {
    findColumnCount(window.innerWidth)
    props.searchPictures()
  }, [])
  
  useEffect(() => {
    renderColumns(props.pictures, columnCount)
  }, [props.pictures, columnCount])
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    if (props.searching) return;
    getMore();
  }, [isFetching, props.pictures]);

  function handleScroll() {
    if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 1000) {
      setIsFetching(true);
    }
  }
  function getMore() {
    if(props.noMorePictures){
      setIsFetching(false)
    } else {
      props.searchPictures()
        .then(res => {
          setIsFetching(false);
          
        })
        .catch(console.log)
    }
  }
  return (
    <>
      <FeedColumns tag={Card} deletePicture={props.deletePicture} columnArrays={columnArrays}/>
      <NoContent>
        {isFetching && !props.noMorePictures ? '[ Loading.. ]' : (props.noMorePictures || props.querySearch.length > 0) &&
          <>[ No {props.pictures.length > 0 && "more"} pictures {props.querySearch.length > 0 && `found for: "${props.querySearch}"`}  ]</>
        }         
      </NoContent>
    </> 
  )
};

const NoContent = styled.div`
  display: flex;  
  width: 100vw;
  justify-content: center;
  padding: 2rem;
  font-weight: 600;
  font-size: 16px;
  color: grey;
`

const ConnectedFeed = (props) => (
  <FeedConsumer>
    {(value) => <Feed {...props} {...value} />}
  </FeedConsumer>
);

export default ConnectedFeed;