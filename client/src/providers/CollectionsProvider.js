import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CollectionsContext = React.createContext();

export const CollectionsProvider = (props) => {
  const [ collections, setCollections ] = useState([]);
  const [ query, setQuery ] = useState("");
  const [ noMoreCollections, setNoMoreCollections ] = useState(false)
  const [ searching, setSearching ] = useState(false);

  const resetAndSearchCollections = () => {
    setSearching(true)
    setNoMoreCollections(false)
    axios.get(`/api/collections/?search=${query}&limit=9&offset=0`)
      .then( res => {
        setCollections(res.data)
        setSearching(false)
      })
      .catch( err => {
        setSearching(false)
        console.log(err)
      })
  }

  const searchCollections = () => {
    setSearching(true)
    axios.get(`/api/collections/?search=${query}&limit=9&offset=${collections.length}`)
      .then( res => {
        setCollections(collections.concat(res.data))
        setSearching(false);
        if (res.data.length < 9) setNoMoreCollections(true)
      })
      .catch((err) => {
        console.log(err);
        setSearching(false);
      })
  }

  const collectionsConfig = {
    resetAndSearchCollections,
    searchCollections,
    collections,
    query,
    setQuery,
    searching,
    setSearching,
    noMoreCollections,
    setNoMoreCollections,
  }
  return (
    <CollectionsContext.Provider value={
      collectionsConfig
    }>
      {props.children}
    </CollectionsContext.Provider>
  )
}

export default CollectionsProvider;