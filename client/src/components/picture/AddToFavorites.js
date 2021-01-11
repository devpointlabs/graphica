import React, { useEffect, useState } from 'react';
import { FavConsumer } from '../../providers/FavProvider';
import { AuthConsumer } from '../../providers/AuthProvider';
import starOutlineIcon from '../../img/star_outline_24px.svg'
import starFillIcon from '../../img/star_rate_24px.svg'
import downloadIcon from '../../img/download_24px.svg'
import styled from 'styled-components';

const AddToFavorites = (props) => {
  const [ favId, setFavId ] = useState(null)
  const [ href, setHref ] = useState(null)

  useEffect(() => {
    setFavId(null)
    props.favorites.map( favorite => {
      if (favorite.picture_id === props.image.id) {
        setFavId(favorite.id)
      }
    })
  }, [props.favorites, props.image]) 

  useEffect(() => {
    if (href) {
      let link = document.createElement('a')
      link.href = href
      link.download = props.image.title
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setHref(null)
    }
  },[href])

  const handleClick = () => {
    props.toggleFavorite(props.user.id, favId, props.image.id)
  }

  const handleDownload = () => {

    const imageReceived = () => {
      let canvas = document.createElement("canvas")
      let context = canvas.getContext("2d");
      canvas.width = downloadedImg.width;
      canvas.height = downloadedImg.height;
      context.drawImage(downloadedImg, 0, 0);
      setHref(canvas.toDataURL('image/jpeg', 0.5))
    }

    let downloadedImg = new Image;
    downloadedImg.crossOrigin = "Anonymous";
    downloadedImg.addEventListener("load", imageReceived, false);
    downloadedImg.src = props.image.url;
  }
    
  return(
    <Flex>
      {props.authenticated && 
        <>
          <Icon shadow={props.shadow} favId={favId} src={starOutlineIcon} onClick={handleClick}/>
          <SpacerDiv />
        </>
      }
      <DownloadIcon shadow={props.shadow} src={downloadIcon} onClick={handleDownload}/>
    </Flex>
  )
}

const ConnectedAddToFavorites = (props) => (
  <FavConsumer>
    {(value) => <AddToFavorites {...props} {...value} />}
  </FavConsumer>
);
const AuthConnectedAddToFavorites = (props) => (
  <AuthConsumer>
    {(value) => <ConnectedAddToFavorites {...props} {...value} />}
  </AuthConsumer>
);
export default AuthConnectedAddToFavorites

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
`
const SpacerDiv = styled.div`
  width: 12px;
`
const Icon = styled.img`
  border: 2.5px solid rgb(39, 39, 53);
  background-color: ${props=> props.favId && "#ffcc00"};
  box-sizing: border-box;
  border-radius: 4px;
  height: 2.25rem;
  filter: opacity(75%);
  cursor: pointer;
  box-shadow: ${props => (
    props.shadow && '0 1px 3px rgba(0,0,0,0.75), 0 -1px 4px rgba(255,255,255,0.75), inset 0 1px 3px rgba(0,0,0,0.75), inset 0 -1px 4px rgba(255,255,255,0.75)' 
  )};
`
const DownloadIcon = styled.img`
  background: rgb(39, 39, 53);
  border-radius: 4px;
  height: 2.25rem;
  filter: opacity(75%);
  cursor: pointer;
  box-shadow: ${props => (
    props.shadow && '0 1px 3px rgba(0,0,0,0.75), 0 -1px 4px rgba(255,255,255,0.75)' 
  )};
  padding: 6px 7.5px;
`
