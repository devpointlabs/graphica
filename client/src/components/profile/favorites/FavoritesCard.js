import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '../../modal/Modal';
import useModal from '../../../hooks/useModal';
import PictureShow from '../../picture/PictureShow';
import { ImageConsumer } from '../../../providers/ImageProvider';
import { Link } from 'react-router-dom';
import RemoveFavorite from './RemoveFavorite';

const FavoritesCard = (props) => {
  const [ picture, setPicture ] = useState(null)
  const [ user, setUser ] = useState([])
  const { toggle, open } = useModal()
  
  useEffect(() => getData(), [])

  useEffect(() => {
    getData()
  }, [props.favorites]) //there should be another way to make these components without having to refetch the pictures on delete


  const getData = () => {
    axios.get(`/api/pictures/${props.fav.picture_id}`)
      .then( res => {
        setPicture(res.data)
        props.fetchUser(res.data.user_id)
          .then( res => setUser(res.data))
          .catch(console.log)
      })
      .catch(console.log)
  }

  const toggleAndDelete = (incomingId) => {
    toggle()
    props.updateFeed(incomingId)
  }

  const toggleAndSetId = () => {
    props.setImageId(picture.id)
    toggle()
  }
  return (
      <> 
        {picture &&  
          <Container>
            <Modal onClose={toggle} open={open}>     
              <PictureShow toggle={toggle} toggleAndDelete={toggleAndDelete} />   
            </Modal>  
            <Flex>
              <StyledTitle>
                { picture.title }
              </StyledTitle>
              <RemoveFavorite fav={props.fav} />
            </Flex>
            <ProfileCard url={picture.url} onClick={toggleAndSetId} />
            <Link to={`/profile/${user.id}`}>
              <Flex>
                <UserImage url={user.image}/>
                <StyledDescription>
                  &nbsp;{user.first_name}{" "}{user.last_name}
                </StyledDescription>
              </Flex>
            </Link>
          </Container>
        } 
      </> 
  ) 

}

const Container = styled.div`
  margin: 20px;
  a:link {
    color: black;
  }
  a:visited {
    color: black;
  }
  a:hover {
    color: black;
  }
  a:active {
    color: black;
  }

`
const StyledTitle = styled.p`
  font-size: 24px;
  width: 30rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.75rem !important;
`
const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`
const StyledDescription = styled.div`
  width: 30rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
`

const ProfileCard = styled.div`
  width: 30rem;
  height: 30rem;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.url});
  cursor: zoom-in;
`;

const UserImage = styled.div`
  background-image: url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  height: 30px;
  width: 30px;
`

const ConnectedFavoritesCard = (props) => (
  <ImageConsumer>
    {(value) => <FavoritesCard {...props} {...value} />}
  </ImageConsumer>
);

export default ConnectedFavoritesCard