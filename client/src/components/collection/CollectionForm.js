import React, { useState, useEffect } from 'react';
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider";
import { ImageConsumer } from "../../providers/ImageProvider";
import styled from "styled-components";

const CollectionForm = (props) => {
  const [ title, setTitle ] = useState("")
  const [ description, setDescription ] = useState("")

  useEffect(() => {
    if (props.collection) {
      setDescription(props.collection.description)
      setTitle(props.collection.title)
    }
  }, [])

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleChangeDescription = (event) => {
    setDescription(event.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
   if (props.collection) {
      axios.patch(`/api/users/${props.user.id}/collections/${props.collection.id}`, { title: title, description: description })
        .then( res => props.handleRes(res))
        .catch(console.log)
   } else {
      axios.post(`/api/users/${props.user.id}/collections`, { title: title, description: description })
        .then( res => props.handleRes(res.data)) //Consider Changing these to both res or both res.data
        .catch(console.log)
    }
  }

  return (
    <>
    <FormWrapper>
      <FormHeader>{props.collection ?<> edit collection</> : <>create a new collection</>}</FormHeader>
    </FormWrapper>
      <StyledLine></StyledLine>
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          title: 
          <TitleInput type="text" name="title" value={title} required onChange={handleChangeTitle}/>
        </StyledLabel>
        <StyledLabel>
          description: 
          <DescriptionInput type="text" name="description" value={description} onChange={handleChangeDescription}/>
        </StyledLabel>
        <SubmitButton>submit</SubmitButton>
      </StyledForm>
    </FormWrapper>
    </>
  )
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`
const FormHeader = styled.div`
 font-size: 1.5rem;
 font-family: 'Montserrat',  sans-serif !important;
 display: flex;
 justify-content: flex-start;
`
const StyledLabel = styled.div`
  font-family: 'Montserrat',  sans-serif !important;
`
const StyledLine = styled.hr`
  background-color: #96969C;
  margin: 0;
`
const TitleInput = styled.input`
  font-size: 1rem;
  width: 100%;
  font-family: 'Montserrat',  sans-serif !important;
  margin-top: 4px;
  margin-bottom: 10px;
  padding: 5px;
  margin-bottom: 10px;
`
const DescriptionInput = styled.textarea`
  font-size: 1rem;
  width: 100%;
  max-height: 40%;
  font-family: 'Montserrat',  sans-serif !important;
  resize: none;
  padding: 5px;
  margin-bottom: 10px;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
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

const ConnectedCollectionForm = (props) => (
  <AuthConsumer>
      {(value) => <CollectionForm {...props} {...value} />}
  </AuthConsumer>
);

const AuthConnectedCollectionForm = (props) => (
  <ImageConsumer>
    {(value) => <ConnectedCollectionForm {...props} {...value} />}
  </ImageConsumer>
);

export default AuthConnectedCollectionForm;