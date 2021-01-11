import React, { useState, useEffect} from 'react';
import CollectionCard from './CollectionCard'
import styled from 'styled-components';
import axios from 'axios';
import useRenderColumns from '../../hooks/useRenderColumns';
import FeedColumns from '../feed/FeedColumns';

const CollectionFeed = ({ loading, setLoading, ...props }) => {
  const [ otherPics, setOtherPics ] = useState([]);
  const { columnArrays, columnArrays2, renderColumns } = useRenderColumns();
  const [ columnCount, setColumnCount ] = useState(3);
  const [ width, setWidth ] = useState(1000);
  
  useEffect(() => {
    findColumnCount(window.innerWidth)
  }, [])
  
  useEffect(() => {
    const newarray = []
    if (props.otherPicIds.length === 0) setLoading(false);
    props.otherPicIds.map( id => (
      axios.get(`/api/pictures/${id}`)
      .then(res => {
        setLoading(false)
          newarray.push(res.data)
          if (newarray.length === props.otherPicIds.length) {
            setOtherPics(newarray.sort((a, b) => (a.id > b.id) ? 1 : -1))
          }
        })
        .catch(console.log)
        ))
  }, [props.otherPicIds])
  
  useEffect(() => {
    runRenderColumns()
  }, [props.pictures, otherPics, props.adding])

  window.onresize = () => handleResize()

  const handleResize = () => {
    let newWidth = window.innerWidth
    if (width < 1000 && newWidth > 999) {
      setColumnCount(3)
      runRenderColumns(3)
    } else if (width > 699 && newWidth < 700) {
      setColumnCount(1)
      runRenderColumns(1)
    } else if (width > 999 && newWidth < 1000 || width < 700 && newWidth > 699) {
      setColumnCount(2)
      runRenderColumns(2)
    }
    setWidth(window.innerWidth)
  }

  const findColumnCount = (width) => {
    if (width > 999) {
      setColumnCount(3)
    } else if (width < 1000 && width > 699) {
      setColumnCount(2)
    } else {
      setColumnCount(1)
    }
  }

  const runRenderColumns = (n) => {
    if (props.adding) {
      renderColumns(otherPics, n || columnCount)
    } else {
      renderColumns(props.pictures, n || columnCount)
    }
  }
  
  const addPicture = (incomingPicture) => {
    setOtherPics( otherPics.filter(a => a.id !== incomingPicture.id)) 
    props.addPicture(incomingPicture)
  }
  
  const updateFeedState = (incomingId) => {
    props.deletePicture(incomingId)
  }

  const returnColumns = (input) => (
    <>
      {input.length > 0 
        ?
          <FeedColumns tag={CollectionCard} input={input} columnArrays={columnArrays} columnArrays2={columnArrays2} 
            addPicture={addPicture} adding={props.adding} removing={props.removing} removeImage={props.removeImage} updateFeedState={updateFeedState}
          />
        : 
          <NoContent> 
            <>
              { props.pictures === input &&
                <> [ there are no pictures in this collection ] </>
              }
              { otherPics === input && 
                <> [ all your pictures are in this collection ] </>
              }
            </>
          </NoContent>
      }
    </>
  )

  return (
    <>
      {props.adding 
        ?
          <>
            { loading 
              ? 
                <NoContent> [ loading.. ] </NoContent>
              :
                <> { returnColumns(otherPics) } </>
            }
          </>
        :
          <>
            { returnColumns(props.pictures) }
          </>
      }
    </>
  )
};

const NoContent = styled.div`
  display: flex;  
  width: 100vw;
  justify-content: center;
  padding: 2rem;
  font-weight: 600;
  font-size: 16px;
  color: grey;
`

export default CollectionFeed