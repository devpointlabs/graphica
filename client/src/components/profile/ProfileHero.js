import React from 'react';
import SeeContact from './SeeContact';
import styled from 'styled-components';
import { AuthConsumer } from '../../providers/AuthProvider';
import { Redirect } from 'react-router-dom';

// need to link in user's banner image when that gets up and running.
const ProfileHero = ({ user }) => (
  <BannerImage url={user.banner_image}>
      <BannerLeft>
        <BannerLeftTop>
          <UserAvatar url={user.image}/>
          <BannerContents>
            <UserName>
              {user.first_name} {user.last_name}
            </UserName>
            <UserEmail>
              {user.email}
            </UserEmail>
            <SeeContact user={user} />
              
            
          </BannerContents>
        </BannerLeftTop>
        <BioSubText>
          {user.tagline}
        </BioSubText>
      </BannerLeft>
  </BannerImage>
) 

const BannerImage = styled.div`
  width: 100%;
  height: 33vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 429px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: linear-gradient(89.41deg, #FFFFFF 37.43%, rgba(255, 255, 255, 0) 90.74%), url(${props => props.url});
`;

const BannerLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin-left: 5rem;
`

const BannerLeftTop = styled.div`
  display: flex;
`

const BannerContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 2rem;
`

// css calc function for accurate vh for the image
const UserAvatar = styled.div`
  width: 186px;
  height: 186px;
  flex-shrink: 0;
  border-radius: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.url});
`;

const UserName = styled.p`
  width: 425px;
  height: 16.64px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 17px;
  color: black;
  text-transform: capitalize;
`

//users email
const UserEmail = styled.p`
  width: 130px;
  height: 15px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: black;
  font-style: italic;
`

  // about me under profile picture
const BioSubText = styled.p`
  width: 425px;
  height: 16.64px;
  margin-top:2rem;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: black;
`
export default ProfileHero;