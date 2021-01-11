import useModal from '../../hooks/useModal';
import Modal from '../modal/Modal';
import React, { useState } from 'react'
import styled from 'styled-components';

const ContactModal = ({ user }) => {
  const { open, toggle } = useModal();

  return (
    <>
      <ContactInfo onClick={ toggle }>see contact</ContactInfo>
      <Modal onClose={toggle} open={open}>
          <>
            <Top>
              <h1>{user.first_name} {user.last_name}</h1>
            </Top>
            <hr></hr>
            <Bottom>
              <h2>Contact Info</h2>
              <h3>Email</h3>
              <i>{user.email}</i>
              <h3>Graphica Account:</h3>  
              <a href={`https://graphica_domain/profile/${user.id}`} target="_blank" >
                <p>https://graphica_domain/profile/{user.id}</p>
              </a>
            </Bottom>
          </>
      </Modal>
    </>
  )
}

const ContactInfo = styled.div`
  color: #0099BA;
  cursor: pointer;
  display: inline;
`
const Top = styled.div`
  padding: 1rem 0 0 2rem;
`
const Bottom = styled.div`
  padding: 1rem 2rem 2rem 2rem;
`
const UserEmail = styled.div`
font-style: italic;
`
export default ContactModal;