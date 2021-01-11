import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CollectionHeader from './CollectionHeader';
import CollectionFeed from './CollectionFeed';
import axios from 'axios';
import EditCollection from './EditCollection';
import { Redirect } from 'react-router-dom';

const CollectionShow = (props) => {
  const [ collection, setCollection ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ pictures, setPictures ] = useState([]);
  const [ redirect, setRedirect ] = useState(null);
  const [ removing, setRemoving ] = useState(false);
  const [ adding, setAdding ] = useState(false);
  const [ allPictures, setAllPictures ] = useState([]);
  const [ otherPicIds, setOtherPicIds ] = useState([]);
  const [ finalArray, setFinalArray ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => getData(), [])

  useEffect(() => {
    if (user && props.match.params.id !== user.id) { getData() }
  }, [props.match.params.id])

  const getData = () => {
    axios.get(`/api/collections/${props.match.params.id}`)
      .then( res => {
        setCollection(res.data);
        return axios.get(`/api/users/${res.data.user_id}`);
      })
      .then((res) => setUser(res.data))
      .catch(console.log);

    axios.get(`/api/collections/${props.match.params.id}/pictures`)
      .then( res => {
        setPictures(res.data)
      })
      .catch(console.log);
  }

  const handleRes = (res) => setCollection(res.data);
  
  const deleteCollection = (incomingId) => {
      axios.delete(`/api/collections/${incomingId}`)
        .then(res => setRedirect(`/profile/${user.id}/?collections`))
        .catch(console.log)
  }

  const removeImage = (picId) => {
    axios.get(`/api/pictures/${picId}/collection_pictures`)
      .then( res => {
        res.data.map( pc => {
          if( pc.collection_id === collection.id){
            axios.delete(`/api/collection_pictures/${pc.id}`)
              .then(res => deletePicture(picId))
              .catch(console.log)
          }
        })
      })
  }

  const deletePicture = (incomingId) => setPictures( pictures.filter(a => a.id !== incomingId ))

  const addPicture = (incomingPicture) => {
    axios.post(`/api/collection_pictures/`, {collection_id: collection.id, picture_id: incomingPicture.id} )
      .then( res => setPictures( pictures.concat(incomingPicture)) )
      .catch(console.log)
  }

  const toggleRemoving = () => {
    setAdding(false)
    setRemoving(!removing)
  }
  
  const toggleAdding = () => {
    setRemoving(false)
    setAdding(!adding)
    setLoading(true)
    axios.get(`/api/users/${user.id}/pictures`)
      .then( res => {
        setAllPictures(res.data)
        compare(res.data, pictures)
      })
      .catch(console.log)
    }
    
  const compare = (arr1, arr2) => {
    const newarray1 = []
    const newarray2 = []
    arr1.forEach(pic => newarray1.push(pic.id))
    arr2.forEach(pic => newarray2.push(pic.id))
    setOtherPicIds( newarray1.filter(x => !newarray2.includes(x)) )
  }

  return (
    <Wrapper>
      {collection && user && pictures &&
        <>
          {redirect && <Redirect to={redirect}/> }
          <CollectionHeader collection={collection} user={user}/>
          <EditCollection
            deleteCollection={deleteCollection} 
            handleRes={handleRes} 
            collection={collection} 
            toggleRemoving={toggleRemoving}
            removing={removing}
            toggleAdding={toggleAdding}
            adding={adding}
          />
          <CollectionFeed addPicture={addPicture} 
            deletePicture={deletePicture} 
            otherPicIds={otherPicIds} 
            pictures={pictures} 
            adding={adding} 
            removeImage={removeImage} 
            removing={removing}
            loading={loading}
            setLoading={setLoading}
          />
        </>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
`
export default CollectionShow;