import React from 'react';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Button, Form, Segment, Header, } from 'semantic-ui-react';
import {Link, withRouter } from 'react-router-dom';
import logoFont from '../../fonts/Elianto-Regular.otf';
import store from '../../img/login_page.jpg'
import styled from "styled-components";

class Login extends React.Component {
  state = { email: '', password: '' }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, } = this.state;
    this.props.auth.handleLogin({ email, password, }, this.props.history);
  }
  
  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  }
  
  render() {
    const { email, password, } = this.state;
    
    return (
    <Wrapper>
      <PictureGroup>
        <LoginImage>
          <ImageContents>
            <h2>Free Forever</h2>
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
        </LoginImage>
      </PictureGroup>
      <LoginGroup>
        <GraphicaLogo>
          GRAPHICA
        </GraphicaLogo>
        <GraphicaParagraph>
          Graphica is a novel photo-sharing app that allows users to share their collections. Create an account to start sharing and connecting with other photographers!
        </GraphicaParagraph>
        <SegmentWrapper>
          <Segment basic>
            <Header as='h1' style={{fontSize: '36px'}}>
              Login 
              <Link to ='Register' style={{fontSize: '12px', color: '#0099BA'}}> or signup</Link>
            </Header>
            <LoginForm onSubmit={this.handleSubmit}>
              <label>
                <LabelText>
                  Email
                </LabelText>
                <LoginInput
                  autoFocus
                  required         
                  name='email'
                  value={email}
                  placeholder='Email'
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <LabelText>
                  Password
                </LabelText>
                <LoginInput
                  label="Password"
                  required
                  name='password'
                  value={password}
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange}
              />
              </label>
              <FormSubmit type='submit'>Submit</FormSubmit>
            </LoginForm>
          </Segment>
        </SegmentWrapper>
        <AboutUs>
          <Link to={'/about_us'}>learn about our developers</Link>
        </AboutUs>
        <Home>
          <Link to={'/'}>back to search</Link>
        </Home>
      </LoginGroup>
    </Wrapper>
    )
  }
}

class ConnectedLogin extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth => <Login {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 3rem);
  min-height: 550px;
`

const LoginGroup = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  padding-top: 3rem;
  padding-left: 10rem;
  flex: 1;

  @media (max-width: 812px;) {
    max-width: 400px;
  }
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

const GraphicaParagraph = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: left;
  padding-left: 1rem;
  padding-bottom: 3.5rem;
  width: 60%;
  justify;
`

const SegmentWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 50px;
`

const GraphicaLogo = styled.div`
  display: flex;
  padding-left: 1rem;
  padding-bottom: 2rem;
  font-family: 'Elianto-Regular';
  font-size: 42px;
  @font-face {
    font-family: 'Elianto-Regular';
    src: url(${logoFont}) format("opentype");
  }
  color: #000000
`

const LoginImage = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  background-size: cover;
  background-position: left;
  background-repeat: no-repeat;
  background-image: url(https://res.cloudinary.com/graphica/image/upload/v1593188743/white-mountain_eschby.jpg);
`

const ImageContents = styled.div`
  font-family: Montserrat;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  margin-left: 3rem;
`;

const Home = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 1rem;
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

const LoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 27.5rem;
`

const LoginInput = styled.input`
  border-radius: 0 !important;
  border-width: 2px !important;
  border-color: transparent !important;
  margin-bottom: 1.5rem !important;
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

const LabelText = styled.span`
  display: inline-block;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const FormSubmit = styled.button`
  align-self: flex-start;
  padding: 0.75rem 2rem;
  margin-top: 1rem;
  background: #0099BA;
  box-shadow: 0px 2px 10px rgba(0, 153, 186, 0.5);
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
`

export default withRouter(ConnectedLogin)