import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthConsumer } from '../providers/AuthProvider'

const FavContext = React.createContext();

export const FavConsumer = FavContext.Consumer;

const FavProvider = (props) => {
  const [ favorites, setFavorites ] = useState([]);

  useEffect(() => {
    if (props.authenticated){checkFavorites()}
  }, [])

  useEffect(() => {
    if (props.authenticated){checkFavorites()}
  }, [props.user])

  const checkFavorites = () => {
    axios.get(`/api/users/${props.user.id}/favorites`)
      .then( res => {
        setFavorites(res.data)
      })
      .catch(console.log)
  }

  const toggleFavorite = (userId, favId, imageId) => {
    if (favId) {
      axios.delete(`/api/users/${userId}/favorites/${favId}`)
        .then(res => setFavorites(favorites.filter(a => a.id !== favId)))
        .catch(console.log)
    } else {
      axios.post(`/api/users/${userId}/favorites`, {picture_id: imageId, user_id: userId})
        .then(res => setFavorites(favorites.concat(res.data)))
        .catch(console.log)
    } 
  }

  return(
    <FavContext.Provider value={{
      favorites,
      toggleFavorite,
      
    }}> 
      { props.children }
    </FavContext.Provider>     
  )
}

export const AuthFavProvider = (props) => (
  <AuthConsumer>
    {(value) => <FavProvider {...props} {...value} />}
  </AuthConsumer>
);


export default AuthFavProvider;