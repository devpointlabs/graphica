import React, { useContext } from 'react'
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Link, withRouter, } from 'react-router-dom'
import styled from 'styled-components'
import NavSearchBar from './NavSearchBar';
import SearchBar from '../home/SearchBar';
import useModal from '../../hooks/useModal';
import Modal from '../modal/Modal';
import PictureForm from '../new/PictureForm';
import { FeedContext } from '../../providers/FeedProvider';
import PostIcon from '../../img/add_circle_outline_24px.svg';
import CollectionIcon from '../../img/photo_library_24px.svg';
import SearchIcon from '../../img/search_24px.svg';
import Hamburger from '../navbar/Hamburger';

const NavBar = (props) => {
  const {toggle, open} = useModal();
  const context = useContext(FeedContext);
  const login = props.auth.authenticated
  
  const handleClick = () => {
    context.setQuery(""); 
    context.setCategoryId(null);
    context.setQuerySearch("")
    context.resetAndSearchPictures()
      .then( res => {
        props.history.push(`/`);
      })
      .catch(console.log)
  }
  
  return(
    <>
      <Wrapper>
        <Flex>
            <ResetSearch onClick={handleClick}>
              <Logo>GRAPHICA</Logo> 
              <LogoSm>GRAPHICA</LogoSm>
            </ResetSearch>
          <AuthDiv>
            { login 
              ?
                <LinkDiv onClick={ () => props.auth.handleLogout(props.history) }>
                  Logout 
                  <Name>
                    &nbsp;{props.auth.user.first_name}
                  </Name>
                </LinkDiv> 
              :
                <><Link to='/register'>  Sign Up</Link> | <Link to='/login'>Login</Link></>
            }
          </AuthDiv> 
        </Flex>
        { !login && 
          <Right>
                <div onClick={()=>props.history.push(`/`)}>  
                  <NavSearchBar />
                  <Icon src={SearchIcon} />
                </div>
                <LinkDiv>
                  <Link to={'/collections'}>
                  <Flex>
                    Collections&nbsp;&nbsp;&nbsp;
                    <Icon src={CollectionIcon} />
                  </Flex>
                  </Link>
                </LinkDiv>
          </Right>
        }
        { login &&   
          <RightLogin>    
              <Flex>
                <div onClick={()=>props.history.push(`/`)}>  
                  <NavSearchBar /> 
                </div>
                <Icon src={SearchIcon} />&nbsp;&nbsp;&nbsp;
              </Flex>
                <LinkDiv>
                  <Link to={'/collections'}>
                  <Flex>
                    <div>
                      Collections&nbsp;&nbsp; 
                    </div>
                    <Icon src={CollectionIcon} />&nbsp;&nbsp;&nbsp;
                  </Flex>
                  </Link>
                </LinkDiv>
                <LinkDiv onClick={()=>toggle()}>
                  <Flex>
                    <PostDiv>
                      Post&nbsp;&nbsp;
                    </PostDiv>
                    <Icon src={PostIcon} />
                  </Flex>
                </LinkDiv>
                <LinkDiv>
                    <Link to={`/profile/${props.auth.user.id}`}>
                  <Flex>
                    <div>
                      &nbsp;&nbsp;Profile&nbsp;&nbsp; 
                    </div>
                    <UserImage image={props.auth.user.image} />&nbsp;&nbsp;&nbsp;
                  </Flex>
                  </Link>
                </LinkDiv>
          </RightLogin>
        }
        <Hamburger toggle={toggle} user={props.auth.user}/>
      </Wrapper>
            <Modal onClose={toggle} open={open}>
              <PictureForm toggleModal={toggle}/>
            </Modal>
      <ClearFix />
    </>
  )
}

const PostDiv = styled.div`
  @media(max-width: 400px){
    display: none;
  }
`
const Name = styled.div`
  // @media (max-width: 499px){
  //   display: none;
  // }
`
const Icon = styled.img`
  height: 1rem;
  width: 1rem;
  margin-top: -0.3rem;
`
const UserImage = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 100%;

`
const SearchImg = styled.img`
  // margin-bottom: -2rem;
  height: 1rem;
`
const ResetSearch = styled.div`
  cursor: pointer;
`
const Wrapper = styled.div`
  position: fixed;
  z-index:1;
  align-items: center;
  display: flex;
  width: 100%;
  height: 3rem;
  padding: 0 3rem;
  justify-content: space-between;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-size: 11px;
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
  .clearfix {
    overflow: auto;
  }
  background-color: white;
  @media (max-width: 649px) {
    padding: 1rem;
  }
`
const ClearFix = styled.div`
  width: 100%;
  height: 3rem;
`
const RightLogin = styled.div`
  display: flex;
  align-items: center;
  width: 450px;
  justify-content: space-between;

  @media(max-width: 749px){
    display: none
  }
`
const Right = styled.div`
  display: flex;
  align-items: center; 
  justify-content: space-between;
  width: 274px;
  @media(max-width: 599px){
    width: 246px;
  }
  @media(max-width: 499px){
    width: 218px;
  }
  @media(max-width: 449px){
    display: none;
  }
 
`

const Flex = styled.div `
  display: flex;
  align-items: center;
`
const Logo = styled.div`
  font-family: 'Elianto' !important;
  font-size: 17px;
  @media only screen and (max-width: 399px) { 
    display: none;
  }
`
const LogoSm = styled.div`
  font-family: 'Elianto' !important;
  font-size: 17px;

  // margin-left: -2rem;
  // padding-right: 4rem;
  @media only screen and (min-width: 400px) { 
    display: none;
  }
`
const AuthDiv = styled.div`
  margin-left: 1vw;
`

const LinkDiv = styled.div`
  cursor: pointer;
  display: flex;
`

const ConnectedNavBar = (props) => (
  <AuthConsumer> 
    { auth => <NavBar { ...props } auth={auth} />}
  </AuthConsumer>
)

export default withRouter(ConnectedNavBar);
