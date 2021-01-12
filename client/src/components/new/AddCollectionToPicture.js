import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";

const AddCollectionToPicture = (props) => {
  const [ collections, setCollections ] = useState([])
  const [ collectionId, setCollectionId ] = useState({})
  
  useEffect(() => {
    axios.get(`/api/collections`)
      .then( res => (setCollections(res.data)))
      .catch(console.log)
  }, [])

  const handleChange = (event) => {
    setCollectionId(event.target.value)
    props.handleCollectionId(collectionId)
  }

  return (
    <PictureCollectionForm >
      <label>
        Collection: 
        <select
          type="select"
          name="collection"
          value={collectionId}
          onChange={handleChange}
          required
          >
          { collections.map((collection) => (<option value={collection.id}> {collection.title} </option>)) }
        </select>
      </label>
    </PictureCollectionForm>
  )
}

const PictureCollectionForm = styled.form`
  display: flex;
  flex-direction: column;
`

export default AddCollectionToPicture