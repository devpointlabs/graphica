import React from 'react';
import styled from 'styled-components';
import Card from '../home/Card';
import CollectionCard from '../collection/CollectionCard';

const FeedColumns = ({ tag, columnArrays, columnArrays2, input, ...props}) => (
  <>
    <FeedDiv>
      { columnArrays.map( column => (
        <ColumnContainer>
          {column.map(listItem => (
            <>
              {tag === Card && <Card key={listItem.id} image={listItem} updateFeedState={props.deletePicture}/>}
              {tag === CollectionCard && <CollectionCard key={listItem.id} picture={listItem} addPicture={props.addPicture} adding={props.adding} removing={props.removing} removeImage={props.removeImage} updateFeedState={props.updateFeedState}/>}
            </>
          ))}
        </ColumnContainer>
      ))}
    </FeedDiv>
  </>
)

const FeedDiv = styled.div`
  display: flex;
  padding-right: 20px;
  padding-top: 20px;
  width: 75vw;
  margin: auto;
  min-width: 1000px;
  @media (max-width: 999px) {
    min-width: 700px;
    width: 95vw;
    @media (max-width: 699px) {
      min-width: 375px;
      padding: 0;
    }
  }
`

const ColumnContainer = styled.div`
  margin-top: 25px;
  margin-left: 25px;
  width: calc(100% / 3);
  @media (max-width: 999px) {
    width: calc(100% / 2);
    @media (max-width: 699px) {
      width: 100%;
      margin: 25px 0 0 0;
    }
  }
`

export default FeedColumns