import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const FeedContext = React.createContext();

export const FeedConsumer = FeedContext.Consumer;

export const FeedProvider = (props) => {
  const [pictures, setPictures] = useState([]);
  const [query, setQuery ] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [searching, setSearching ] = useState(false);
  const [noMorePictures, setNoMorePictures] = useState(false);
  const [querySearch, setQuerySearch] = useState("")
  
  const categorySearch = (catId) => {
    setSearching(true)
    setNoMorePictures(false)
    axios.get(`/api/pictures/?search=${query}&limit=11&offset=${0}&category_id=${catId}`)
      .then(res => {
        setPictures(res.data);
        setSearching(false);
        setCategoryId(catId)
      })
      .catch(console.log)
  }
  
  const searchPictures = () => {
    return new Promise((resolve, reject) => {
      setSearching(true)
        axios.get(`/api/pictures/?search=${query}&limit=11&offset=${pictures.length}&category_id=${categoryId}`)
        .then(res => {
          setPictures(pictures.concat(res.data));
          setSearching(false);
          if (res.data.length < 11) setNoMorePictures(true)
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        })
    })
  }

  const resetAndSearchPictures = () => {
    return new Promise((resolve, reject) => {
      setNoMorePictures(false)
      setSearching(true)
      axios.get(`/api/pictures/?search=${query}&limit=11&offset=${0}&category_id=${null}`)
        .then(res => {
          setPictures(res.data);
          setSearching(false);
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          setSearching(false)
          reject(err);
        })
    })
  }

  const resetPictures = () => setPictures([]);

  const deletePicture = (incomingId) => setPictures( pictures.filter(a => a.id !== incomingId ))
  
  const feedConfig = {
    setQuery,
    setCategoryId,
    resetAndSearchPictures,
    setQuerySearch,
  } //THIS ISN'T DOING ANYTHING ^^
  // Refactor to remove consumer..
  return(
    <FeedContext.Provider value={{
      feedConfig,
      pictures,
      searching,
      resetPictures,
      resetAndSearchPictures,
      setCategoryId,
      categoryId,
      categorySearch,
      query,
      setQuery,
      querySearch,
      setQuerySearch,
      searchPictures,
      offset: pictures.length,
      deletePicture,
      noMorePictures,
      setNoMorePictures,
    }}> 
      { props.children }
    </FeedContext.Provider>     
  )
}

export default FeedProvider;