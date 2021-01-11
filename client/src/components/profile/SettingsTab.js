import React, { Fragment, } from 'react';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Form, Grid, Image, Container, Divider, Header, Button, } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import UpdateProfileImage from './UpdateProfileImage';
import UpdateBannerImage from './UpdateBannerImage';
import styled from 'styled-components';

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class Profile extends React.Component {
  state = { editing: false, formValues: { first_name: '', last_name: '', email: '', file: '', tagline: '' }, };
  
  componentDidMount() {
    const { auth: { user: { first_name, last_name, email, tagline }, }, } = this.props;
    this.setState({ formValues: { first_name, last_name, email, tagline }, });
  }
  
  
  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }
  
  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value,
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { formValues: { first_name, last_name, email, file, tagline }} = this.state
    const { auth: { user, updateUser }} = this.props
    updateUser(user.id, { first_name, last_name, email, file, tagline })
      .then((user) => this.props.setUser(user))
      .catch(console.log)
      
    this.setState({
      editing: false,
      formValues: {
        ...this.state.formValues,
        file: ''
      }
    })
  }

  profileView = () => {
    const { auth: { user }, } = this.props;
    return (
      <Fragment>
        <Grid.Column width={4}>
          <Image src={user.image || defaultImage} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h1">{user.first_name}</Header>
          <Header as="h1">{user.last_name}</Header>
          <Header as="h1">{user.email}</Header>
        </Grid.Column>
      </Fragment>
    )
  }

  editView = () => {
    const { auth: { user, updateUserProfileImage, updateUserBannerImage }, } = this.props;
    const { formValues: { first_name, last_name, email, file, tagline } } = this.state;

    return (
      
      <>
        <UpdateProfileImage updateUserProfileImage={updateUserProfileImage} user={user} setUser={this.props.setUser} />
        <UpdateBannerImage updateUserBannerImage={updateUserBannerImage} user={user} setUser={this.props.setUser} />
        <Form onSubmit={this.handleSubmit}>
          <Grid.Column width={4}>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Input
              label="First Name"
              name="first_name"
              value={first_name}
              required
              onChange={this.handleChange}
              />
            <Form.Input
              label="Last Name"
              name="last_name"
              value={last_name}
              required
              onChange={this.handleChange}
              />
            <Form.Input
              label="Email"
              name="email"
              value={email}
              required
              onChange={this.handleChange}
              />
            <Form.Input
              label="Bio"
              name="tagline"
              value={tagline}
              required
              onChange={this.handleChange}
              />
            <UpdateButton>Update</UpdateButton>
          </Grid.Column>
        </Form>
      </>
    )
  }

  render() {
    const { editing, } = this.state;
    return (
      this.props.auth.authenticated && (
        <Container>
          <Divider hidden />
          <Grid>
            <Grid.Row>
              { editing ? this.editView() : this.profileView()}
              <Grid.Column>
                <UpdateButton onClick={this.toggleEdit}>{editing ? 'Cancel' : 'Edit'}</UpdateButton>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      )
    )
  }
}

const SettingsTab = (props) => (
  <AuthConsumer>
    { auth => 
      <Profile { ...props } auth={auth} />
    }
  </AuthConsumer>
)


const UpdateButton = styled.button`
  background: #0099BA;
  box-shadow: 0px 2px 10px rgba(0, 153, 186, 0.5);
  border-radius: 4px;
  color: white;
  border: none;
  font-family: 'Montserrat',  sans-serif;
  margin-top: 10px;
  display: flex;
  align-self: center;
  cursor: pointer;
  padding: 0.75rem 1.25rem; 
`

const styles = {
  dropzone: {
    height: "150px",
    width: "150px",
    border: "1px dashed black",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
}
export default SettingsTab;