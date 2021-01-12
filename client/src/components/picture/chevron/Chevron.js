import React, { useState, useEffect, useContext} from 'react'; 
import styled from 'styled-components';
import { ImageContext } from '../../../providers/ImageProvider';
import { FeedContext } from '../../../providers/FeedProvider';
import chevron_right from '../../../icon/chevron_right_24px.svg';
import chevron_left from '../../../icon/chevron_left_24px.svg';

const Chevron = () => {
  const imageContext = useContext(ImageContext);
  const feedContext = useContext(FeedContext);
  const highId = feedContext.pictures[0].id
  // console.log(feedContext.pictures[0].id)

  const prevPicture = () => {
    imageContext.chevronDirection("ascending")
  }
  const nextPicture = () => {
    imageContext.chevronDirection("descending")
  }


  return (
    // <div style={{display: "flex", justifyContent: "space-between"}}>
    //   {(highId !== imageContext.imageId) && <ChevronLeft onClick={prevPicture} image={chevron_left}/> }
    //   {(imageContext.imageId !== 1) && <ChevronRight onClick={nextPicture} image={chevron_left}/>} 
    // </div>
    <>
    {imageContext.imageId !== 1 && imageContext.imageId !== highId && 
      <Flex>
        <ChevronLeft onClick={prevPicture} image={chevron_left}/>
        <ChevronRight onClick={nextPicture} image={chevron_left}/>
      </Flex>
    }
    {imageContext.imageId === highId && 
      <RightDiv>
        <ChevronRight onClick={nextPicture} image={chevron_left}/>
      </RightDiv> 
    }
    {imageContext.imageId === 1 &&
      <ChevronLeft onClick={prevPicture} image={chevron_left}/>
    }
    </>
  )
}

export default Chevron
const RightDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  // align-items: flex-end;
`
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChevronLeft = styled.div`
  background-image: url(${chevron_left});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  height: 70px;
  width: 70px;
  position: relative;
  top: 500px;
  left: -5rem;
  cursor: pointer;
`

const ChevronRight = styled.div`
  background-image: url(${chevron_right});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  height: 70px;
  width: 70px;
  position: relative;
  top: 500px;
  left: 5rem;
  cursor: pointer;
`