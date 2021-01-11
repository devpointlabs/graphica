import React from 'react';
import deleteImg from '../../../img/delete_24px.svg';
import styled from 'styled-components';
import { AuthConsumer } from '../../../providers/AuthProvider';
import { FavConsumer } from '../../../providers/FavProvider';

const RemoveFavorite = (props) => {

  const removeImage = () => {
    props.toggleFavorite(props.user.id, props.fav.id, props.fav.picture_id)
  }

  return(
    <>
      { props.authenticated && props.user.id === props.fav.user_id &&
        <>
          <RemoveDiv image={deleteImg} onClick={removeImage}/> 
        </>
      }
    </>
  )
}

const RemoveDiv = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  height: 20px;
  width: 20px;  
  cursor: pointer;
  margin-left: -20px;
`

const ConnectedRemoveFavorite = (props) => (
  <FavConsumer>
    {(value) => <RemoveFavorite {...props} {...value} />}
  </FavConsumer>
);
const AuthConnectedRemoveFavorite = (props) => (
  <AuthConsumer>
    {(value) => <ConnectedRemoveFavorite {...props} {...value} />}
  </AuthConsumer>
);
export default AuthConnectedRemoveFavorite