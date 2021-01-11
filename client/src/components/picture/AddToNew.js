import React from 'react'
import CollectionForm from '../collection/CollectionForm'
import { ImageConsumer } from '../../providers/ImageProvider'

const AddToNew = (props) => {

  const handleRes = (collection) => {
    props.addImageToCollection(collection.id)
    props.toggleModal()
  }

  return <CollectionForm handleRes={handleRes}/>

}

const ConnectedAddToNew = (props) => ( 
  <ImageConsumer>
      {(value) => <AddToNew {...props} {...value} />}
  </ImageConsumer>
)

export default ConnectedAddToNew
