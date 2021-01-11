import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FeedContext } from './FeedProvider';

export const ImageContext = React.createContext();

export const ImageConsumer = ImageContext.Consumer;


export const ImageProvider = (props) => {
  const [ imageId, setImageId] = useState();
  const [ user, setUser] = useState("");
  const [ userImage, setUserImage] = useState();
  const [ pictureJunctions, setPictureJunctions ] = useState(null);
  const [ userCollections, setUserCollections ] = useState([{title: 'there are none'}])
  const [ direction, setDirection ] = useState(null);
  const [ imageIds, setImageIds ] = useState([])
  
  const feedContext = useContext(FeedContext)
  //get all image ids for search from feedContext
  
  console.log(imageIds)
  useEffect(() => {
    axios.get(`/api/users`)
    getImageIds()
  }, [])

  const getImageIds = () => {
    console.log(feedContext.pictures)
    setImageIds(feedContext.pictures.map(picture => picture.id))
  }

  const fetchUser = (userId) => {
    return new Promise((resolve, reject) => {
      axios.get(`/api/users/${userId}`)
        .then( res => { 
            resolve(res)
          }) 
        .catch((err) => {
          console.log(err);
          reject(err);
        })
    })
  }

  const fetchComments = (id) => {
    return new Promise((resolve, reject) => {
      axios.get(`/api/pictures/${id}/picture_comments`)
      .then( res => {
        resolve(res)
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      })
    })
  }

  const fetchImage = (id) => {
    return new Promise((resolve, reject) => {
      axios.get(`/api/pictures/${id}`)
      .then( res => {
        updateViews(res.data)
        // checkFavorite(res.data)
        resolve(res)
      })
      .catch((err) => {
        if (direction === "descending") {
          setImageId(imageId-1)
        } else if ( direction === "ascending") {
          setImageId(imageId + 1)
        } 
        console.log(err);
        reject(err);
      })
    })
  }

  const updateViews = (image) => {
    axios.patch(`/api/pictures/${image.id}`, {views: image.views+1, url: image.url, title: image.title, description: image.description, user_id: image.user_id, category_id: image.category_id})
  }

  const fetchCategory = (catId) => {
    return new Promise((resolve, reject) => {
      axios.get(`/api/categories/${catId}`)
      .then( res => {
        resolve(res)
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      })
    })
  }

  const fetchJunction = (id) => {
      axios.get(`/api/pictures/${id}/collection_pictures`)
      .then( res => {
        setPictureJunctions(res.data)
      })
      .catch(console.log)
  }

  const fetchCollection = (collectionId, userId) => {
    return new Promise((resolve, reject) => {
      axios.get(`/api/collections/${collectionId}`)     
        .then( res => {
        resolve(res)
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      })
    })  
  }

  const removeImageFromCollection = (junctionId) => {
    axios.delete(`/api/collection_pictures/${junctionId}`)
      .then( res => {
        setPictureJunctions(pictureJunctions.filter(a => a.id !== junctionId))
      })
      .catch(console.log)
  }

  const addImageToCollection = (junctionId) => {
    console.log("imageId:", imageId)
    console.log('junctionId', junctionId)
    axios.post(`/api/collection_pictures`, {picture_id: imageId, collection_id: junctionId})
      .then( res => {
        setPictureJunctions(pictureJunctions.concat(res.data)) //add to top of list at some point?
      })
      .catch(console.log)
  }

  const fetchCollections = (userId) => {
    axios.get(`/api/users/${userId}/collections`)
    .then(res => (setUserCollections(res.data)))
    .catch(console.log)
  }

  const addToFavorites = (userId) => {
    axios.post(`/api/users/${userId}/favorites`, {picture_id: imageId, user_id: userId})
      .then(res => console.log("new favorite", res.data))
      .catch(console.log)
  } //Removing from here..

  const chevronDirection = (incomingDirection) => {
    setDirection(incomingDirection)
    if (incomingDirection === "ascending") {
      setImageId(imageId + 1) //change these to setImageId(imageIds[imageIds.IndexOf(imageId) +1])
    } else if (incomingDirection === "descending")
      setImageId(imageId - 1)
  }
  return(
    <ImageContext.Provider value={{
      chevronDirection,
      fetchUser,
      user,
      userImage,
      fetchComments,
      fetchImage,
      fetchCategory,
      fetchJunction,
      fetchCollection,
      imageId,
      setImageId,
      pictureJunctions,
      removeImageFromCollection,
      addImageToCollection,
      fetchCollections,
      userCollections,
      addToFavorites,
    }}> 
      { props.children }
    </ImageContext.Provider>     
  )
}

export default ImageProvider;