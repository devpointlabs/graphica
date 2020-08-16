import React, { useState, useEffect,} from 'react';
import Card from './Card';
import styled from 'styled-components';
import { FeedConsumer } from '../../providers/FeedProvider'

const Feed = (props) => {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    props.searchPictures();
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    getMore();
  }, [isFetching]);
  
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

  const renderColumns = () => {
    const column_arrays = [[], [], []];
    const column_height = [0,0,0]

    props.pictures.forEach((listItem) => {
      if (column_height[0] <= (column_height[1] && column_height[2])) {
        column_arrays[0].push(listItem);
        column_height[0] = column_height[0] + 1/listItem.ratio
      } else if (column_height[1] <= (column_height[0] && column_height[2])) {
        column_arrays[1].push(listItem);
        column_height[1] = column_height[1] + 1/listItem.ratio
      } else {
        column_arrays[2].push(listItem);
        column_height[2] = column_height[2] + 1/listItem.ratio
      }
    })
  
  const updateFeedState = (incomingId) => {
    props.deletePicture(incomingId)
  }
    return (
      <>
        <FeedDiv>
          <ColumnContainer>
            {column_arrays[0].map(listItem =><><Card key={listItem.id} image={listItem} updateFeedState={updateFeedState}/></>)}
          </ColumnContainer>
          <ColumnContainer>
            {column_arrays[1].map(listItem =><><Card key={listItem.id} image={listItem} updateFeedState={updateFeedState}/></>)}
          </ColumnContainer>
          <ColumnContainer>
            {column_arrays[2].map(listItem =><><Card key={listItem.id} image={listItem} updateFeedState={updateFeedState}/></>)}
          </ColumnContainer>
        </FeedDiv>
        <NoContent>
          {isFetching && !props.noMorePictures ? '[ Loading.. ]' : (props.noMorePictures || props.querySearch.length > 0) &&
            <>[ No {props.pictures.length > 0 && "more"} pictures {props.querySearch.length > 0 && `found for: "${props.querySearch}"`}  ]</>
          }         
        </NoContent>
      </>
    )
  }

  return renderColumns();
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
const FeedDiv = styled.div`
  display: flex;
  padding-right: 20px;
  padding-top: 20px;
  width: 75vw;
  margin: auto;
  min-width: 1000px;
`
const ColumnContainer = styled.div`
  margin-top: 25px;
  margin-left: 25px;
  width: calc(100% / 3);
  @media (max-width: 1600px) {};
  @media (max-width: 1100px) {}
  @media only screen and (max-width: 800px) {}
`

const ConnectedFeed = (props) => (
  <FeedConsumer>
    {(value) => <Feed {...props} {...value} />}
  </FeedConsumer>
);

export default ConnectedFeed;

