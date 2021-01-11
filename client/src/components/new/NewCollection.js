import React, { useState } from 'react';
import Modal from '../modal/Modal';
import useModal from "../../hooks/useModal";
import CollectionForm from "../collection/CollectionForm";
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Gallery from "../../img/photo_library_24px.svg";

const NewCollection = (props) => {
  const { open, toggle } = useModal();
  const handleRes = (newCollection) => {
    toggle()
    props.history.push(`/collections/${newCollection.id}`)
  } 

  return (
   <>
    <CollectionButton onClick={ toggle }>
      New Collection 
      <Icon src={Gallery} />
    </CollectionButton>
    <Modal onClose={toggle} open={open}>
      <CollectionForm handleRes={handleRes}/>
    </Modal>
   </>
  )
}

const CollectionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.25rem;
  background: #0099BA;
  box-shadow: 0px 2px 10px rgba(0, 153, 186, 0.5);
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: 1.5rem;
`
const Icon = styled.img`
  height: 1.15rem;
  margin-left: 0.5rem;
  filter: invert(100%) sepia(0%) saturate(7488%) hue-rotate(11deg) brightness(98%) contrast(97%);
`

export default withRouter(NewCollection);
