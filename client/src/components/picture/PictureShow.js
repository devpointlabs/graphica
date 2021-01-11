import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Comments from './comments/Comments'
import { Link } from 'react-router-dom'; 
import PictureCollection from './PictureCollection';
import { ImageConsumer } from '../../providers/ImageProvider'
import EditPicture from './EditPicture'
import AddCollectionButton from './AddCollectionButton';
import AddToFavorites from './AddToFavorites';
import Chevron from './chevron/Chevron';

//Add category search on category click

const PictureShow = (props) => {
  const [user, setUser ] = useState([]) 
  const [category, setCategory] = useState("");
  const [comments, setComments] = useState([]);
  const [image, setImage] = useState([])
  const [showAllCollections, setShowAllCollections ] = useState(false)

  useEffect(() => runFetch(props.imageId), [props.imageId])
  
  const runFetch = (id) => {
    props.fetchImage(id)
      .then(res => {
        setImage(res.data)
        props.updateViewsState && props.updateViewsState(id)
        props.fetchCategory(res.data.category_id)
          .then(res => setCategory(res.data))
          .catch(console.log)
        props.fetchUser(res.data.user_id)
          .then(res => setUser(res.data))
          .catch(console.log)
        props.fetchJunction(id)
      })
      .catch(console.log)  
    props.fetchComments(id)
      .then(res => setComments(res.data))
      .catch(console.log)  
  }

  const refreshImageState = (incomingImage, incomingCategory) => {
    setImage(incomingImage) 
    setCategory(incomingCategory)
  }

  const setStatePictureShow = (newComment) => setComments([ newComment, ...comments  ])
  const deleteCommentState = (incomingId) => setComments( comments.filter( a => a.id !== incomingId ))
  const deleteImageState = () => props.toggleAndDelete(image.id)
  
  const addToFavorites = (userId) => { props.addToFavorites(userId) }

  const renderCollections = () => (
    <>
      { showAllCollections 
        ?
          <>
            {props.pictureJunctions.map(jct => (
              <>
                <PictureCollection 
                  pictureCollection={jct}
                  runFetch={runFetch} 
                  fetchCollection={props.fetchCollection}
                  image={image}
                  userId={user.id}
                  toggle={props.toggle}
                />
              </>
            ))}
          </> 
        :
          <>
            <PictureCollection 
              pictureCollection={props.pictureJunctions[0]}
              runFetch={runFetch} 
              fetchCollection={props.fetchCollection}
              image={image}
              userId={user.id}
              toggle={props.toggle}
              /> 
          </>
      }
      { props.pictureJunctions.length > 1 &&
        <>
          { (showAllCollections == false) 
            ? <LinkDiv onClick={()=>setShowAllCollections(true)}> see all collections </LinkDiv>
            : <LinkDiv onClick={()=>setShowAllCollections(false)}> show less </LinkDiv>
          }
        </>
      }
    </>
  )

  return (
    <>
      <Chevron />
      <Wrapper>
        <UserInfoDiv>
          <UserInfoLeft>
            <div onClick={()=>props.toggle()}>
              <Link to={`/profile/${user.id}`} >
                  <UserImage image={user.image} />  
              </Link>
            </div>
            <UserLeftContent>
              <NameDiv>
                {user.first_name} {user.last_name}
              </NameDiv>
              <EmailDiv>
                {user.email}
              </EmailDiv>
            </UserLeftContent>
          </UserInfoLeft>
          <UserInfoRight>
            <div>
              {image && <AddToFavorites shadow={true} image={image} addToFavorites={addToFavorites}/> }
            </div>
            <ViewsDiv>
              {image.views && <>{(image.views + 1).toLocaleString()} views </>}
            </ViewsDiv>
          </UserInfoRight>
        </UserInfoDiv>
        <PictureDiv>
          <StyledImg src={image.url} />
        </PictureDiv>
        <PictureInfoDiv>
          <InfoLeft>{image.title}</InfoLeft>
          { category && 
            <EditPicture 
            userId={user.id} 
            image={image} 
            category={category} 
            deleteImageState={deleteImageState}
            refreshImageState={refreshImageState}
            />
          }
        </PictureInfoDiv>
        <PictureCollectionDiv>
            { props.pictureJunctions && (props.pictureJunctions.length > 0) ? <> {renderCollections()} </> : null }
        </PictureCollectionDiv>
        <AddDiv>
          <AddCollectionButton  pictureJunctions={props.pictureJunctions} userId={user.id} image={image}/>
        </AddDiv>
        <PictureDescriptionDiv>
          <InfoLeft>
            Description
          </InfoLeft>
          <InfoRight>
          in {category.title} category
          {/* in <a href="url">{category.title}</a> category */} 
          </InfoRight>
        </PictureDescriptionDiv>
          <Description> {image.description} </Description>
        <Comments toggle={props.toggle} comments={comments} pictureId={props.imageId} setStatePictureShow={setStatePictureShow} deleteCommentState={deleteCommentState}/>
      </Wrapper>
    </>
  )
}


const Wrapper = styled.div`
  min-height: 600px;
  max-height: 100vh;
  overflow-y: auto;
  width: 78vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: Montserrat;
  padding-bottom: 2rem;
  ::-webkit-scrollbar { /* WebKit */ //COME UP WITH BETTER SOLUTION THAN THIS #####
    width: 0;
    height: 0;
  } 
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
`
const UserInfoDiv= styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  padding-left: 25px;
`
const UserInfoRight = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;
  // padding: 1rem;
  margin-top: 20px;
`
const ViewsDiv = styled.div`
  padding-top: 0.75rem;
`
const UserInfoLeft = styled.div`
  display: flex;
  align-items: center;
  font-family: Montserrat;
  font-style: normal;
`
const UserImage = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  height: 70px;
  width: 70px;
`
const UserLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 1rem;
  margin-top: 20px;
`
const NameDiv = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
`
const EmailDiv = styled.div`
  color: gray;
  font-size: 12px;
  margin-bottom: 12px;
`
const PictureDiv = styled.div`
  display: grid;
  height: 100%;
`
const StyledImg = styled.img`
  max-width: 100%;
  max-height: 85vh;
  margin: auto;
`
const PictureInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2rem;
`
const AddDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem 0rem 2rem;
`
const InfoRight = styled.div`
`
const InfoLeft = styled.div`
  font-weight: bold;
  font-size: 24px;
`
const PictureCollectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;  
`
const PictureDescriptionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  // padding: 1rem;
  padding: 1rem 2rem 9px 2rem;
  // padding-bottom: 9px;
`
const Description = styled.div`
  width: 100%;
  font-weight: normal;
  font-size: 12px;
  padding-left: 2rem;
  margin-top: 1px;
`
const LinkDiv = styled.div`
  color: #0099BA;
  cursor: pointer;
  padding-left: 2rem;
`

const ConnectedPictureShow = (props) => (
  <ImageConsumer>
    {(value) => <PictureShow {...props} {...value} />}
  </ImageConsumer>
);

export default ConnectedPictureShow;



