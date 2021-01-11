import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import closeImg from "../../img/close_24px.svg"
 
const Modal = ({children, onClose, open }) =>
  open
   ? ReactDOM.createPortal(
      <div className='modal' >
        <ModalWrapper>       
          <ModalCard>          
            <CloseButton onClick={onClose}>            
              <svg width="40" height="40" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="grey"/>
              </svg>
            </CloseButton>
          {children}
          </ModalCard>
          <Background onClick={onClose} />      
        </ModalWrapper>   
      </div>,
        document.body
      )
   : null
  
export default Modal; 

const ModalWrapper = styled.div`
  position: fixed;  
  top: 0;
  left: 0;
  z-index:2;
  width: 100vw;  
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalCard = styled.div`
  
  min-width: 320px;
  z-index: 10;
  background: white;
  
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`; 
const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  border: none;
  background: transparent;
  padding: 10px;
  &:hover {    
    cursor: pointer;
  }`; 
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5;
`;