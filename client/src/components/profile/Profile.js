import React from 'react';
import styled from 'styled-components';
import ProfileNavbar from './ProfileNavbar';
import ProfileHero from './ProfileHero';
import ProfileCollectionFeed from './ProfileCollectionFeed';
import SettingsTab from './SettingsTab';
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider";
import Recent from './Recent';
import NewCollection from '../new/NewCollection';
import NewPictureButton from '../new/NewPictureButton';
import Favorites from './favorites/Favorites'

class Profile extends React.Component {
  state = { currentTab: "recent", user: null, isCurrentUser: false }
  
  componentDidMount() {
    this.getUser();
    if (this.props.location.search === "?collections") { this.setState({ currentTab: "collections" }) }
  }
  
  componentDidUpdate(prevProps) {
    const prevId = prevProps.match.params.id;
    const currentId = this.props.match.params.id;
    if (prevId !== currentId) {
      this.getUser();
      this.setState({ currentTab: "recent" })
    }
  }

  getUser = () => {
    axios.get(`/api/users/${this.props.match.params.id}`)
    .then((res) => {
      const id = this.props.auth.user ? this.props.auth.user.id : null;
      const isCurrentUser = res.data.id === id;
      this.setState({ user: res.data, isCurrentUser });
    })
    .catch(console.log);
  }

  setUser = (user) => {
    this.setState({ user });
  }

  changeTab = (currentTab) => {
    this.setState({ currentTab });
  }

  renderBottom = () => {
    switch(this.state.currentTab) {
      case "recent":
        return this.state.user ? <Recent user={this.state.user} isCurrentUser={this.state.isCurrentUser} /> : null
      case "collections":
        return this.state.user ? <ProfileCollectionFeed user={this.state.user} /> : null
      case "favorites":
        return this.state.user && <Favorites user={this.state.user}/>
      case "settings":
        return this.state.user ? <SettingsTab setUser={this.setUser} user={this.state.user} /> : null
      default:
        return null
    }
  }

  render() { 
    return (
      <Wrapper>
        { this.state.user && <ProfileHero user={this.state.user} /> }
        <ProfileNavbar 
          currentTab={this.state.currentTab}
          changeTab={this.changeTab} 
          isCurrentUser={this.state.isCurrentUser}
        />
        <Line />
        <br></br>
        { this.state.isCurrentUser &&
          <ButtonWrapper>
            <NewPictureButton /> 
            <NewCollection />
          </ButtonWrapper>
        }
        <ProfileBottom>
          { this.renderBottom() }
        </ProfileBottom>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div``

// line underneath
const Line = styled.div`
  border-bottom: 1px solid rgba(39, 39, 53, 0.75);
  margin: 0 5rem;
`;

const ProfileBottom = styled.div`
  width: 100%;
`
const ButtonWrapper = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 4.9rem;
`

const ConnectedProfile = (props) => (
  <AuthConsumer>
    { (auth) => <Profile {...props} auth={auth} /> }
  </AuthConsumer>
)

export default ConnectedProfile;
