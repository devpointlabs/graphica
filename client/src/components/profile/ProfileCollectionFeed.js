import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CollectionPreviewCard from './CollectionPreviewCard';

class ProfileCollectionFeed extends React.Component {
  state = { collections: [], user: null }

  componentDidMount() {
    this.getCollections()
  }

  componentDidUpdate(prevProps) {
    const prevId = prevProps.user.id;
    const currentId = this.props.user.id;
    if(prevId !== currentId) {
      this.getCollections();
    }
  }

  getCollections() {
    axios.get(`/api/users/${this.props.user.id}/collections`)
    .then((res) => this.setState({ collections: res.data }))
    .catch(console)
  }

  renderCollections = () => this.state.collections.map((collection) => (
    <CollectionPreviewCard key={collection.id} collection={collection} />
  ))

  render() {
    return(
      <>
        { this.state.collections.length > 0 
        ?
          <FeedDiv>
            { this.renderCollections() }
          </FeedDiv>
        :
          <NoContent>
            [ there are no collections here yet ]
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
  width: 75%;
  min-width: 1000px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  padding-top: 5%;
`

export default ProfileCollectionFeed;