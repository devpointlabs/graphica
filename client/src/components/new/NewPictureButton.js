import React from 'react';
import Modal from '../modal/Modal';
import useModal from "../../hooks/useModal";
import PictureForm from "../new/PictureForm";
import styled from 'styled-components';
import AddIcon from "../../img/add_circle_outline_24px.svg";

const NewPictureButton = () => {
  const { open, toggle } = useModal();

  return (
   <>
    <AddButton onClick={ toggle }>
      Add a Picture
      <Icon src={AddIcon} />
    </AddButton>
    <Modal onClose={toggle} open={open}>
      <PictureForm toggleModal={toggle}/>
    </Modal>
   </>
  )
}

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  background: #0099BA;
  box-shadow: 0px 2px 10px rgba(0, 153, 186, 0.5);
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
`
const Icon = styled.img`
  height: 1.15rem;
  margin-left: 0.5rem;
  filter: invert(100%) sepia(0%) saturate(7488%) hue-rotate(11deg) brightness(98%) contrast(97%);
`

export default NewPictureButton;