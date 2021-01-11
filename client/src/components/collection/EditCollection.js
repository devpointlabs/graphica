import React, { useState } from 'react';
import CollectionForm from './CollectionForm';
import { AuthConsumer } from '../../providers/AuthProvider';
import styled from 'styled-components';
import Modal from '../modal/Modal';
import useModal from '../../hooks/useModal';

const EditCollection = (props) => {
  const { open, toggle } = useModal();
  const [ openDeleteModal, setOpenDeleteModal ] = useState(false)

  const handleRes = (res) => {
    toggle()
    props.handleRes(res)
  }

  const toggleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal)
  }

  const deleteCollection = () => {
    props.deleteCollection(props.collection.id)
  }

  return (
    <>
      {props.authenticated && props.user.id === props.collection.user_id &&
        <>
          <Modal onClose={toggle} open={open}>  
            <CollectionForm handleRes={handleRes} collection={props.collection} />
          </Modal>
          <ButtonWrapper>
            <EditButton onClick={props.toggleAdding}>
              {props.adding 
                ? 
                  <strong>I'm Done Adding</strong>
                : "Add Pictures"
              }
              
            </EditButton>
            <EditButton onClick={props.toggleRemoving}>
              
              {props.removing 
                ? 
                  <strong>Show Pictures</strong>
                : "Remove Pictures"
              }
            </EditButton>
            <EditButton onClick={()=>toggle()}>
              Edit Collection
              <svg style={{display: "inline-block"}} width="1rem" height="1rem" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0H18C19.1 0 20 0.9 20 2V14C20 15.1 19.1 16 18 16H6C4.9 16 4 15.1 4 14V2C4 0.9 4.9 0 6 0ZM18 14V2H6V14H18ZM9.5 9.67L11.19 11.93L13.67 8.83L17 13H7L9.5 9.67ZM0 18V4H2V18H16V20H2C0.9 20 0 19.1 0 18Z" fill="white"/>
              </svg>
            </EditButton> 
            <DeleteButton onClick={toggleDeleteModal}>
              Delete Collection
              <svg style={{display: "inline-block"}} width="18" height="18" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM16 9V19H8V9H16ZM6 7H18V19C18 20.1 17.1 21 16 21H8C6.9 21 6 20.1 6 19V7Z" fill="white"/>
              </svg>
            </DeleteButton>
            
          </ButtonWrapper>
          <Modal onClose={toggleDeleteModal} open={openDeleteModal}>
            <FlexPad>
              <h4><strong>Really Delete Collection?</strong></h4>
              <i>this will not delete its pictures</i>
              <div style={{paddingTop: "1rem"}}>
                <StyledButtonYes onClick={deleteCollection}>Yes</StyledButtonYes>
                <StyledButton onClick={toggleDeleteModal}>No</StyledButton>
              </div>
            </FlexPad>
          </Modal>
        </>
      }
    </>
  )
}
const StyledButton = styled.button`
  width: 148px;
  height: 38px;
  background: #0099BA;
  box-shadow: 0px 2px 10px rgba(0, 153, 186, 0.5);
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
`
const StyledButtonYes = styled.button`
  width: 148px;
  height: 38px;
  background: #0099BA;
  box-shadow: 0px 2px 10px rgba(0, 153, 186, 0.5);
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  margin-right: 2rem;
`
const EditButton = styled.button`
  display: flex;
  align-items: center;
  width: 148px;
  height: 38px;
  justify-content: center;
  background: #0099BA;
  box-shadow: 0px 2px 10px rgba(0, 153, 186, 0.5);
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  margin-right: 25px;
`

const DeleteButton = styled.button`
  width: 169px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0099BA;
  box-shadow: 0px 2px 10px rgba(0, 153, 186, 0.5);
  border-radius: 4px;
  color: white;
  // margin-left: 25px;
  border: none;
  font-family: 'Montserrat',  sans-serif;
  cursor: pointer;
`
const ButtonWrapper = styled.div `
  width: 75vw;
  display: flex;
  align-items: center;
  margin: 0 auto 0 auto;
  margin-bottom: 25px;
`
const FlexPad = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
  
`

const ConnectedEditCollection = (props) => (
  <AuthConsumer>
      {(value) => <EditCollection {...props} {...value} />}
  </AuthConsumer>
);

export default ConnectedEditCollection
