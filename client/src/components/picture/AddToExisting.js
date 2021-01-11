import React, { useState, useEffect } from 'react'
import { AuthConsumer } from '../../providers/AuthProvider';
import { ImageConsumer } from '../../providers/ImageProvider';
import styled from "styled-components";

const AddToExisting = (props) => {
  const [ collectionId, setCollectionId ] = useState()

  useEffect(() => {
    props.fetchCollections(props.user.id) 
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addImageToCollection(collectionId)
    props.toggleModal()
  }

  const handleChange = (event) => {
    setCollectionId(event.target.value)
  }
  
  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit} >
        <StyledLabel>
          collection: 
          <FormSelect type="select" name="collection" value={collectionId} onChange={handleChange} required>
            <option value="" disabled selected>select your option...</option>
            { props.userCollections.map((collection) => (
              <option value={collection.id} >{collection.title}</option> 
              ))}
          </FormSelect>
        </StyledLabel>
        <SubmitButton>submit</SubmitButton>
      </StyledForm>
    </FormWrapper>
  )
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`
const SubmitButton = styled.button`
  background: #0099BA;
  box-shadow: 0px 2px 10px rgba(0, 153, 186, 0.5);
  border-radius: 4px;
  color: white;
  border: none;
  font-family: 'Montserrat',  sans-serif;
  margin-top: 10px;
  align-self: center;
  cursor: pointer;
  padding: 10px 20px;
  width: 100%;
`
const StyledLabel = styled.div`
  font-family: 'Montserrat',  sans-serif !important;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`
const FormSelect = styled.select`
  font-size: 1rem;
  width: 100%;
  padding 5px;
  font-family: 'Montserrat',  sans-serif !important;
`

const ConnectedAddToExisting = (props) => (
  <AuthConsumer>
    {(value) => <AddToExisting {...props} {...value} />}
  </AuthConsumer>
);

const AuthConnectedAddToExisting = (props) => (
  <ImageConsumer>
    {(value) => <ConnectedAddToExisting {...props} {...value} />}
  </ImageConsumer>
);

export default AuthConnectedAddToExisting