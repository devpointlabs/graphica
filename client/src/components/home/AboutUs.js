import React from 'react';
import styled from "styled-components";

const AboutUs = () => {
  const developers = [
    {name: 'Nick Ristagno', 
      email: 'nick.ristagno@gmail.com',
      avatar: 'https://res.cloudinary.com/graphica/image/upload/v1595961629/nick_profile_mkdumk.jpg', 
      banner: 'https://res.cloudinary.com/graphica/image/upload/v1595689078/dewang-gupta-tcLcXdiAzDA-unsplash_eqq8fq.jpg',
      description: 'Project Manger',
      contributionFront: 'Designed Wireframes',
      contributionEnd: 'Oversaw all procedures'
    },
    {name: 'Braden Church', 
      email: 'bradenchurch@gmail.com', 
      avatar: 'https://res.cloudinary.com/graphica/image/upload/v1595988171/C734132E-A3DE-4A62-A2EB-8FE267626751_dxnosp.jpg', 
      banner: 'https://res.cloudinary.com/graphica/image/upload/v1595690134/roan-lavery-p9tE8gHjd6s-unsplash.jpg.jpg',
      contributionFront: 'Profile Page, Collection Page, Registration',
      description: 'I chose to work on the Graphica app because I felt like it would be the most real to life applications. I really enjoyed working on the routing and seeing the app come to life while watching the fronted and backend come to life.',
      contributionEnd: 'User Authentication, React-Router-Dom'
    }, 
    {name: 'Daniel McKenna', 
      email: 'mckenna.daniel15@gmail.com', 
      avatar: 'https://res.cloudinary.com/graphica/image/upload/v1594778414/DSC03579.JPG.jpg', 
      banner: 'https://res.cloudinary.com/graphica/image/upload/v1595704387/waves_fti7dk.jpg',
      description: `I decided to work on the graphica project becasue I felt it had the most features in regards to,
      working with other API's and how much data we would need to get from the backend to the front end. To me that is what sold me on this
      project. I really wanted to learn how to use differnt API's and how to connect backend functionality to the frontend. `,
      contributionFront: 'Forms, Collection Show, Developer Page',
      contributionEnd: 'Controllers, Cloudinary API, Routes'
    }, 
    {name: 'Danny Leaver', 
      email: 'dleaver@gmail.com', 
      avatar: 'https://res.cloudinary.com/danleaver/image/upload/v1596344132/photo_o4dy0m.jpg',
      banner: 'https://res.cloudinary.com/graphica/image/upload/v1595725935/tetons_e1hvnu.jpg',
      description: `I thought this project would be pretty in-depth, 
      and that I would be able to apply a lot of what I had learned from the bootcamp. I learned many
      concepts in Ruby on Rails and ReactJS along the way, and I also learned how to work
      on a somewhat complex idea in a group setting. It was challenging to finish on time, as well as collaborate efficiently. 
         `,
      contributionFront: 'Homepage, Feeds, Collections, Favorites, Navbar, Picture Modal',
      contributionEnd: 'Seeds, Searchbar, Routes',
      link: "https://github.com/danleaver/",
    }, 
    {name: 'Jacob Koskimaki', 
      email: 'jkoskimaki@gmail.com', 
      avatar: 'https://res.cloudinary.com/graphica/image/upload/v1595796766/jacob_gf3qrh.jpg',
      banner: 'https://res.cloudinary.com/graphica/image/upload/v1595464168/elephant.jpeg.jpg',
      description: 'As a photography enthusiast, the Graphica project naturally stood out to me as a way to apply programming skills towards an exciting end project. Graphica gave me a chance to work on the backend framework and apply novel design principles using React and Ruby on Rails.',
      contributionFront: 'Login, Registration, Form styling',
      contributionEnd: 'Controllers and Routes'
    }, 
    {name: 'Jake Sasser', 
      email: 'sasserjacob@gmail.com', 
      avatar: 'https://res.cloudinary.com/graphica/image/upload/ar_1:1,b_rgb:262c35,bo_2px_solid_rgb:fdfdfd,c_fill,g_auto,r_max,w_1000/v1595984208/IMG_0907_new_n2yswb.jpg', 
      banner: 'https://res.cloudinary.com/graphica/image/upload/v1594947500/alex-lange-pv14V3sRB0c-unsplash_flxbhi.jpg.jpg',
      description: 'I chose Graphica as my portfolio project because I felt that it would be a project where I could apply and solidify my newly learned skills plus learn additional concepts. It proved to be both challenging and rewarding.',
      contributionFront: 'Sign up and Login Page, Profile Page',
      contributionEnd: 'User Authentication, React-Router-Dom'
    },
  ]

  return (
    <>
      {developers.map(developer => (
        <BannerImage url={developer.banner}>
          <BannerLeft>
            <BannerLeftTop>
              <UserAvatar url={developer.avatar}/>
              <BannerContents>
                <UserName>
                  {developer.name}
                </UserName>
                <UserEmail>
                  {developer.email}
                </UserEmail>
              </BannerContents>
            </BannerLeftTop>
              <BioSubText>
                {developer.description}
              </BioSubText>
          </BannerLeft>
          <BannerRight>
            <FrontEndDiv>
              <StyledP>Front End:</StyledP>
              {developer.contributionFront} 
              {/* {developer.link && <a hrefx`={developer.link}>GitHub</a> } */}
            </FrontEndDiv>
            <BackEndDiv>
              <StyledP>Back End:</StyledP>
                {developer.contributionEnd}
            </BackEndDiv>
          </BannerRight>
        </BannerImage>
      ))}
    </>
  )
}

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
`
const BannerLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin-left: 5rem;
`
const BannerRight = styled.div`
  display: flex;
  flex-shrink: 0;
  margin: 11.7rem 0 0 10rem;
  align-self: flex-start;
  flex-direction: column;
`
const StyledP = styled.p`
  width: 200px;
  height: 16.64px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 17px;
  color: black;
`
const BannerLeftTop = styled.div`
  display: flex;
  line-height: 17px;
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
`
const UserName = styled.p`
  width: 300px;
  height: 16.64px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 17px;
  color: black;
`
const UserEmail = styled.p`
  width: 130px;
  height: 15px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: black;
`
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
const FrontEndDiv = styled.div`
 display: flex;
 flex-direction: column;
`
const BackEndDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6.7rem;
`

export default AboutUs