import React, { useState } from 'react';
import { AuthConsumer } from '../../providers/AuthProvider';
import addImg from '../../img/add_circle_outline_24px.svg';
import styled from 'styled-components';
import AddOrCreateCollection from './AddOrCreateCollection';
import Modal from '../modal/Modal';
import useModal from '../../hooks/useModal';

const AddCollectionButton = (props) => {
  const { open, toggle } = useModal();
  
  return (
    <>  
      { props.authenticated && (props.user.id === props.userId ) &&
        <>
          <AddToCollection onClick={()=>toggle()} >
            <Flex>
              &nbsp;Add to { props.pictureJunctions && props.pictureJunctions.length > 0 ? <>Another</> : <>a</>} Collection&nbsp;
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 5V9H5V11H9V15H11V11H15V9H11V5H9ZM2 10C2 14.41 5.59 18 10 18C14.41 18 18 14.41 18 10C18 5.59 14.41 2 10 2C5.59 2 2 5.59 2 10Z" fill="white"/>
              </svg>
            </Flex>
          </AddToCollection>
          <Modal onClose={toggle} open={open}>               
            <AddOrCreateCollection toggleModal={toggle}/>
          </Modal>
        </>
      }
    </>
  )
}

const Flex = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-weight: 600;
  width: 100%
`
const AddToCollection = styled.button`
  cursor: pointer;
  height: 38px;
  background: #0099BA;
  box-shadow: 0px 2px 10px rgba(0, 153, 186, 0.5);
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
`

const ConnectedAddCollectionButton = (props) => (
  <AuthConsumer>
    {(value) => <AddCollectionButton {...props} {...value} />}
  </AuthConsumer>
);

export default ConnectedAddCollectionButton