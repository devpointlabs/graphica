import React, { useState } from 'react'
import AddToExisting from './AddToExisting';
import AddToNew from './AddToNew';
import styled from 'styled-components';

const AddOrCreateCollection = (props) => {
  const [ toggle, setToggle ] = useState(true)
  const addToExisting = () => setToggle(true)
  const addToNew = () => setToggle(false)

  return (
    <>
      { toggle 
        ? 
          <> 
            <FormWrapper>
              <FormHeader> add picture to a collection </FormHeader>
            </FormWrapper>
            <StyledLine></StyledLine>
            <AddToExisting toggleModal={props.toggleModal} />
            <StyledLine></StyledLine>
            <ExistingButtonDiv>
              <SubmitButton onClick={addToNew}> or create a new collection </SubmitButton>
            </ExistingButtonDiv>
          </>
        : 
          <>
            <AddToNew toggleModal={props.toggleModal}/>
            <StyledLine></StyledLine>
            <ExistingButtonDiv>
              <SubmitButton onClick={addToExisting}> or choose an existing collection </SubmitButton>
            </ExistingButtonDiv>
          </>
      }
    </>
  )
}

const ExistingButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  padding-top: 0.55rem;
`
const FormHeader = styled.div`
 font-size: 1.5rem;
 font-family: 'Montserrat',  sans-serif !important;
 display: flex;
 justify-content: flex-start;
`
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`
const StyledLine = styled.hr`
  background-color: #96969C;
  margin: 0;
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

export default AddOrCreateCollection