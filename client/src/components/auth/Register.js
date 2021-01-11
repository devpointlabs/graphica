import React from 'react';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Button, Form, Segment, Header, Grid, } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import logoFont from '../../fonts/Elianto-Regular.otf';
import store from '../../img/login_page.jpg'
import {Link, withRouter } from 'react-router-dom';
import styled from "styled-components";

class Register extends React.Component {
  state = { email: '', password: '', passwordConfirmation: '', first_name: '', last_name: '', tagline: '', file: '' };
  
  onDrop = (files) => {
    const blob = new Blob([files[0]], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    this.setState({ 
      formValues: { ...this.state.formValues, file: files[0] },
      url,
    }) 
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirmation, file } = this.state;
    const { auth: { handleRegister, }, history, } = this.props;

    if (password === passwordConfirmation)
      handleRegister( this.state , history);
    else
      alert('Passwords Do Not Match!')
  }
  
  handleChange = (e) => {
    const { name, value, file} = e.target;
    this.setState({ [name]: value, });
  }
  
  render() {
    const { email, password, passwordConfirmation, first_name, last_name, tagline, file } = this.state;
    
    return (
      <Wrapper>
        <PictureGroup>
          <RegisterImage>
            <ImageContents>
              <h2>Welcome to Graphica!</h2>
              <p>
                Discover
              </p>
              <p>
                Experience
              </p>
              <p>
                Learn
              </p>
            </ImageContents>
          </RegisterImage>
        </PictureGroup>
      <RegisterGroup>
        <SegmentWrapper>
        <Segment basic>
          <GraphicaLogo>
            GRAPHICA
          </GraphicaLogo>
          <Header as='h1' style={{fontSize: '36px'}} textAlign='left'>           
          Register
          <Link to ='Login' style={{fontSize: '12px', color: '#0099BA'}}> or login</Link>
          </Header>
          <Form onSubmit={this.handleSubmit}>
          <Grid.Column width={4}>
          </Grid.Column>
          <br></br>
          <label>
          <RegisterText>
              First Name
          </RegisterText> 
          <RegisterInput
              label="First Name"
              required
              min-width="22%"
              name='first_name'
              value={first_name}
              placeholder='First Name'
              onChange={this.handleChange}
            />
            </label>
            <label>
            <RegisterText>
              Last Name
            </RegisterText>   
            <RegisterInput
              label="Last Name"
              required
              name='last_name'
              value={last_name}
              placeholder='Last Name'
              onChange={this.handleChange}
            />
            </label>
            <label>
            <RegisterText>
              Email
            </RegisterText>        
            <RegisterInput
              label="Email"
              required
              autoFocus
              name='email'
              value={email}
              placeholder='Email'
              onChange={this.handleChange}
            />
            </label>
            <label>
            <RegisterText>
              Password
            </RegisterText>
            <RegisterInput
              label="Password"
              required
              name='password'
              value={password}
              placeholder='Password'
              type='password'
              onChange={this.handleChange}
            />
            </label>
            <label>
            <RegisterText>
              Confirm
            </RegisterText>
            <RegisterInput
              label="Confirm"
              required
              name='passwordConfirmation'
              value={passwordConfirmation}
              placeholder='Confirm'
              type='password'
              onChange={this.handleChange}
            />
            </label>
            <FormSubmit type='submit'>Submit</FormSubmit>
          </Form>            
        </Segment>
        </SegmentWrapper>
        <AboutUs>
          <Link to={'/about_us'}>learn about our developers</Link>
        </AboutUs>
        <Home>
          <Link to={'/'}>back to search</Link>
        </Home>
      </RegisterGroup>
    </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 3rem);
  min-height: 450px;
  align-items: left;
`

const SegmentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: left;
  margin-right: 175px;
`

const PictureGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  flex: 1;

  @media (max-width: 812px;) {
    max-width: 400px;
  }
`

const GraphicaLogo = styled.div`
  display: flex;
  padding-bottom: 2rem;
  margin-top: 1rem;
  font-family: 'Elianto-Regular';
  font-size: 42px;
  @font-face {
    font-family: 'Elianto-Regular';
    src: url(${logoFont}) format("opentype");
  }
  color: #000000
`

const RegisterImage = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  background-size: cover;
  background-position: left;
  background-repeat: no-repeat;
  background-image: url(https://res.cloudinary.com/graphica/image/upload/v1593188740/droplet_hv3anl.jpg);
`

const ImageContents = styled.div`
  font-family: Montserrat;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  margin-left: 3rem;
  color: white;
`;

const Home = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: -9rem;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  a:link {
    color: #0099BA;
  }

  a:hover {
    color: lightgrey;
  }

  a:active {
    color: black;
  }
`

const AboutUs = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  a:link {
    color: #0099BA;
  }

  a:hover {
    color: lightgrey;
  }

  a:active {
    color: black;
  }
`

const RegisterGroup = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  margin-top: 0rem;
  margin-left: 10rem;

  flex: 1;
`

const RegisterForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 20.5rem;
`

const RegisterText = styled.span`
  display: inline-block;
  font-weight: 600;
  margin-bottom: 0.25rem;
  `

const RegisterInput = styled.input`
  border-radius: 0 !important;
  border-width: 2px !important;
  border-color: transparent !important;
  margin-bottom: 1.5rem !important;
  margin-right: 16rem;
  background-color: lightgrey !important;
  
  ::placeholder {
    color: black !important;
  }
  
  &:focus {
    border-color: black !important;
    background-color: white !important;
    ::placeholder {
      color: grey !important;
    }
  }
`

const FormSubmit = styled.button`
  align-self: flex-start;
  padding: 0.75rem 2rem;
  background: #0099BA;
  box-shadow: 0px 2px 10px rgba(0, 153, 186, 0.5);
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: .5rem;
`

export default class ConnectedRegister extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth => <Register { ...this.props } auth={auth} /> }
      </AuthConsumer>
    )
  }
}


