import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FavoritesCard from './FavoritesCard';
import { FavConsumer } from '../../../providers/FavProvider'

const Favorites = (props) => (
  <FeedDiv>
    { props.favorites.map(fav => (
      <FavoritesCard favorites={props.favorites}  fav={fav}/>
    ))}
  </FeedDiv>
)

const FeedDiv = styled.div`
  width: 75vw;
  min-width: 1000px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 5rem;
  align-items: center;
`

const ConnectedFavorites = (props) => (
  <FavConsumer>
    {(value) => <Favorites {...props} {...value} />}
  </FavConsumer>
);

export default ConnectedFavorites
