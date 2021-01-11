import React, { useContext, useState, useEffect } from 'react';
import { CollectionsContext } from '../../providers/CollectionsProvider';
import CollectionPreviewCard from '../profile/CollectionPreviewCard';
import styled from 'styled-components';

const CollectionsFeed = (props) => {
  const [isFetching, setIsFetching] = useState(true);
  const context = useContext(CollectionsContext)

  useEffect(() => {
    context.searchCollections()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleScroll = () => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
      setIsFetching(true);
    }
  }
  useEffect(() => {
    if (!isFetching) return;
    if (context.searching) return;
    getMore();
  }, [isFetching, context.collections]);

  const getMore = () => {
    if(context.noMorePictures){
      setIsFetching(false)
    } else {
      context.searchCollections()
        // .then(res => {
          setIsFetching(false);
        // })
        // .catch(console.log)
    }
  }
  return (
    <FeedDiv>
      {context.collections.map(collection => (
        <CollectionPreviewCard showUser={true} key={collection.id} collection={collection} />
      ))}
    </FeedDiv>
  )
}

const FeedDiv = styled.div`
  width: 75%;
  min-width: 1000px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  padding-top: 5%;
`

export default CollectionsFeed