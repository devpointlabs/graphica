import React, { useEffect, useState } from 'react';
import { AuthConsumer } from '../../providers/AuthProvider'
import deleteImg from '../../img/delete_24px.svg';
import editImg from '../../img/settings_24px.svg';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '../modal/Modal';
import useModal from '../../hooks/useModal';

//Convert title category & description to state hook
//Consider dividing into two components

const EditPicture = (props) => {
  const [ title, setTitle ] = useState(props.image.title)
  const [ description, setDescription ] = useState(props.image.description)
  const [ category, setCategory ] = useState(props.category)
  const [ categories, setCategories ] = useState([])
  const [ editing, setEditing ] = useState(false)
  const [ categoryId, setCategoryId ] = useState(props.category.id)
  const { open, toggle } = useModal();
  const [ openDeleteModal, setOpenDeleteModal ] = useState(false)

  useEffect(() => { 
    axios.get("/api/categories")
    .then(res => setCategories(res.data))
    .catch(console.log)
  }, [])

  const toggleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal)
  }
  const deleteImage = () => {
    toggleDeleteModal()
  }
  const deleteImageConfirm = () => {
      axios.delete(`/api/pictures/${props.image.id}`)
      .then( res => props.deleteImageState(props.image.id)) 
      .catch(console.log)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.patch(
      `/api/pictures/${props.image.id}`, 
      { title: title, description: description, category_id: categoryId }
    )
      .then( res => {
        toggle()
        props.refreshImageState(res.data, categories[categoryId-1])
      })
      .catch(console.log)
  }
  
  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleChangeDescription = (event) => {
    setDescription(event.target.value)
  }

  const handleChangeCategory = (event) => {
    setCategoryId(event.target.value)
  }

  const renderEditPicture = () => (
    <Wrapper>
      <Flex>
        <StyledButton onClick={toggle}>
          <FlexButton>
            Edit Picture&nbsp;
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5022 12C19.5022 12.34 19.4722 12.66 19.4322 12.98L21.5422 14.63C21.7322 14.78 21.7822 15.05 21.6622 15.27L19.6622 18.73C19.5722 18.89 19.4022 18.98 19.2322 18.98C19.1722 18.98 19.1122 18.97 19.0522 18.95L16.5622 17.95C16.0422 18.34 15.4822 18.68 14.8722 18.93L14.4922 21.58C14.4622 21.82 14.2522 22 14.0022 22H10.0022C9.75216 22 9.54216 21.82 9.51216 21.58L9.13216 18.93C8.52216 18.68 7.96216 18.35 7.44216 17.95L4.95216 18.95C4.90216 18.97 4.84216 18.98 4.78216 18.98C4.60216 18.98 4.43216 18.89 4.34216 18.73L2.34216 15.27C2.22216 15.05 2.27216 14.78 2.46216 14.63L4.57216 12.98C4.53216 12.66 4.50216 12.33 4.50216 12C4.50216 11.67 4.53216 11.34 4.57216 11.02L2.46216 9.37C2.27216 9.22 2.21216 8.95 2.34216 8.73L4.34216 5.27C4.43216 5.11 4.60216 5.02 4.77216 5.02C4.83216 5.02 4.89216 5.03 4.95216 5.05L7.44216 6.05C7.96216 5.66 8.52216 5.32 9.13216 5.07L9.51216 2.42C9.54216 2.18 9.75216 2 10.0022 2H14.0022C14.2522 2 14.4622 2.18 14.4922 2.42L14.8722 5.07C15.4822 5.32 16.0422 5.65 16.5622 6.05L19.0522 5.05C19.1022 5.03 19.1622 5.02 19.2222 5.02C19.4022 5.02 19.5722 5.11 19.6622 5.27L21.6622 8.73C21.7822 8.95 21.7322 9.22 21.5422 9.37L19.4322 11.02C19.4722 11.34 19.5022 11.66 19.5022 12ZM17.5022 12C17.5022 11.79 17.4922 11.58 17.4522 11.27L17.3122 10.14L18.2022 9.44L19.2722 8.59L18.5722 7.38L17.3022 7.89L16.2422 8.32L15.3322 7.62C14.9322 7.32 14.5322 7.09 14.1022 6.91L13.0422 6.48L12.8822 5.35L12.6922 4H11.3022L11.1022 5.35L10.9422 6.48L9.88216 6.91C9.47216 7.08 9.06216 7.32 8.63216 7.64L7.73216 8.32L6.69216 7.9L5.42216 7.39L4.72216 8.6L5.80216 9.44L6.69216 10.14L6.55216 11.27C6.52216 11.57 6.50216 11.8 6.50216 12C6.50216 12.2 6.52216 12.43 6.55216 12.74L6.69216 13.87L5.80216 14.57L4.72216 15.41L5.42216 16.62L6.69216 16.11L7.75216 15.68L8.66216 16.38C9.06216 16.68 9.46216 16.91 9.89216 17.09L10.9522 17.52L11.1122 18.65L11.3022 20H12.7022L12.9022 18.65L13.0622 17.52L14.1222 17.09C14.5322 16.92 14.9422 16.68 15.3722 16.36L16.2722 15.68L17.3122 16.1L18.5822 16.61L19.2822 15.4L18.2022 14.56L17.3122 13.86L17.4522 12.73C17.4822 12.43 17.5022 12.21 17.5022 12ZM12.0022 8C9.79216 8 8.00216 9.79 8.00216 12C8.00216 14.21 9.79216 16 12.0022 16C14.2122 16 16.0022 14.21 16.0022 12C16.0022 9.79 14.2122 8 12.0022 8ZM10.0022 12C10.0022 13.1 10.9022 14 12.0022 14C13.1022 14 14.0022 13.1 14.0022 12C14.0022 10.9 13.1022 10 12.0022 10C10.9022 10 10.0022 10.9 10.0022 12Z" fill="white"/>
            </svg>
          </FlexButton>
        </StyledButton> 
        <StyledButtonDelete onClick={deleteImage}>
          <FlexButton>
            Delete Picture&nbsp;
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM16 9V19H8V9H16ZM6 7H18V19C18 20.1 17.1 21 16 21H8C6.9 21 6 20.1 6 19V7Z" fill="white"/>
            </svg>
          </FlexButton>
        </StyledButtonDelete> 
      </Flex>
          <Modal onClose={toggleDeleteModal} open={openDeleteModal}>
                <FlexPad>
                  <h4><strong>Really Delete Image?</strong></h4>
                  <div>
                  <StyledButtonYes onClick={deleteImageConfirm}>Yes</StyledButtonYes>
                  <StyledButton onClick={toggleDeleteModal}>No</StyledButton>
                  </div>
                </FlexPad>
          </Modal>
        <Modal onClose={toggle} open={open}>               
          <FormWrapper>
              <FormHeader>edit picture info</FormHeader>
          </FormWrapper>
          <StyledLine></StyledLine>
          <FormWrapper>
            <StyledForm onSubmit={handleSubmit}>
              <StyledLabel>
                title: 
                <TitleInput type="text" name="title" value={title} required onChange={handleChangeTitle}/>
              </StyledLabel>
              <StyledLabel>
                category: 
                <FormSelect type="select" name="category" onChange={handleChangeCategory} required>
                  {/* how do I remove duplicate title? */}
                  <option value={category.id}>{category.title}</option> 
                    { categories.map(cat => (
                        <option value={cat.id}>{cat.title}</option>
                      )) 
                    }
                </FormSelect>
              </StyledLabel>
              <StyledLabel>
                description: 
                <DescriptionInput type="text" name="description" value={description} onChange={handleChangeDescription}/>
              </StyledLabel>
              <SubmitButton>submit</SubmitButton>
            </StyledForm>
          </FormWrapper>
        </Modal>
    </Wrapper>
  )

  return (
    <>
      { props.authenticated && 
        <> 
          { 
            props.user.id === (props.userId) &&
              <>
                { renderEditPicture() }
              </>
          }
        </>
      }
    </>
  )
}
const FlexPad = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
  
`

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
const StyledButtonDelete = styled.button`
width: 160px;
height: 38px;
background: #0099BA;
box-shadow: 0px 2px 10px rgba(0, 153, 186, 0.5);
border-radius: 4px;
border: none;
color: white;
cursor: pointer;
`
const Flex = styled.div`
  display: flex;
  width: 330px;
  justify-content: space-between;
`
const FlexButton = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  font-weight: 600;
`
const Words = styled.div`
  align-items: center;
  display: flex;
  cursor: pointer;
  font-size: 12px;
  color: #0099BA;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`
const FormHeader = styled.div`
 font-size: 1.5rem;
 font-family: 'Montserrat',  sans-serif !important;
`
const HeaderDiv = styled.div`
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
  padding: 5px;
  margin-bottom: 20px;
`
const DescriptionInput = styled.textarea`
  font-size: 1rem;
  width: 100%;
  max-height: 40%;
  font-family: 'Montserrat',  sans-serif !important;
  resize: none;
  margin-top: 4px;
  padding: 5px;
  margin-bottom: 20px;
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
  cursor: pointer;
  padding: 10px 20px;
  width: 100%;
`

const FormSelect = styled.select`
  font-size: 1rem;
  width: 100%;
  font-family: 'Montserrat',  sans-serif !important;
  padding: 5px;
  margin-bottom: 20px;
`


////////////
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -6px;
`
const EditButton = styled.div `
background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  height: 25px;
  width: 25px;  
  cursor: pointer;
`
const DeleteButton = styled.div `
background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  height: 30px;
  width: 30px;  
  cursor: pointer;
`
const ConnectedEditPicture = (props) => (
  <AuthConsumer>
    {(value) => <EditPicture {...props} {...value} />}
  </AuthConsumer>
);

export default ConnectedEditPicture