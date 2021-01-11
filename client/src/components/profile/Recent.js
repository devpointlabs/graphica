import React from 'react';
import styled from 'styled-components';
import axios from "axios";
import RecentCard from './RecentCard';

class Recent extends React.Component {
  state = { pictures: [] }

  componentDidMount() {
    this.getPictures()
    window.scrollTo(0, 0);
  }
  
  componentDidUpdate(prevProps) {
    const prevId = prevProps.user.id;
    const currentId = this.props.user.id;
    if(prevId !== currentId) {
      this.getPictures();
    }
    window.scrollTo(0, 0);
  }

  getPictures() {
    axios.get(`/api/users/${this.props.user.id}/pictures`)
    .then((res) => this.setState({ pictures: res.data }))
    .catch(console)
  }
  
  deletePicture = (incomingId) => {
    this.setState({ pictures: this.state.pictures.filter(a => a.id !== incomingId) })
  }

  renderPictures = () => this.state.pictures.map((pic) => (
    <RecentCard picture={pic} key={pic.id} user={this.props.user} deletePicture={this.deletePicture} />
  ))

  render() {
    return (
      <>
        {(this.state.pictures.length > 0) 
          ? 
            <FeedDiv>
              { this.renderPictures() }
            </FeedDiv> 
          : 
            <NoContent>
              [ there are no pictures here yet ]
            </NoContent>
        }
      </>
    )
  }
}

const NoContent = styled.div`
  display: flex;  
  width: 100vw;
  justify-content: center;
  padding: 2rem;
  font-weight: 600;
  font-size: 16px;
  color: grey;
`
const FeedDiv = styled.div`
  width: 75vw;
  min-width: 1000px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 5rem;
  align-items: center;
`

export default Recent;