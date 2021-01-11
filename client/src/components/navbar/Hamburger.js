import React, { useState } from 'react';
import styled from 'styled-components';
import menuIcon from '../../icon/menu_24px.svg';
import closeIcon from '../../icon/clear_24px.svg';
import SearchBar from '../home/SearchBar';
import { Link, withRouter, } from 'react-router-dom'
import PostIcon from '../../img/add_circle_outline_24px.svg';
import CollectionIcon from '../../img/photo_library_24px.svg';

const Hamburger = (props) => {
  const [ open, setOpen ] = useState(false)
  const close = () => setOpen(false)

  const Menu = () => {
    return (
      <StyledMenu>
        <div>
          <SearchBar close={close} hamburger={true}/>
        </div>
        <Link onClick={close} to="/collections">
          <Flex>
           <Icon invert={true} src={CollectionIcon} />
            <p>
              &nbsp;&nbsp;Collections
            </p>
          </Flex>
        </Link>
        {props.user && 
          <>
            <Link onClick={close} to={`/profile/${props.user.id}`}>
                <Flex margin={true}>
                  <UserImg image={props.user.image} />
                    <p>
                      &nbsp;&nbsp;Profile
                    </p>
                </Flex>
            </Link>
            <div onClick={()=>{
              props.toggle()
              setOpen(false)
            }}>
              <Flex>
                <Icon invert={true} src={PostIcon} />
                <p>
                  &nbsp;&nbsp;Post
                </p>
              </Flex>
            </div>
          </>
        }
      </StyledMenu>
    )
  }
  

  const onClose = () => setOpen(!open);

  return(
    <Wrapper user={props.user}>
      {open 
        ? 
          <>
            <Icon src={closeIcon} onClick={onClose}/>
            <Menu /> 
            <Background onClick={onClose} />
          </>
        :
          <Icon src={menuIcon} onClick={onClose}/>
      }
      
    </Wrapper>
  )
}
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 4;
`

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${props => props.margin && "margin-top: -2rem;"}
`
const Icon = styled.img`
  height: 2rem;
  width: 2rem;
  filter: ${props => props.invert && "invert(100)"};
`
const UserImg = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
  border: 2.5px solid white;

`
const Wrapper = styled.div`
  @media(min-width: ${props => props.user ? "750px" : "450px"}){
    display: none;
  }
`
const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: top;
  background: rgba(57, 57, 57, 0.9);
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 72px;
  bottom: 80vh;
  right: 0;
  transition: transform 0.3s ease-in-out;
  font-size: 2rem;
  font-weight: bold;
  p {color: white;}
  width: 100%;

  a {
    // text-transform: uppercase;
    padding: 2rem 0;
    // letter-spacing: 0.5rem;
    color: white;
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: white;
    }
  }
`

export default withRouter(Hamburger);