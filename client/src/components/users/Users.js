import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from  'react-router-dom';

//THIS NEEDS TO BE CHANGED INTO A USER SEARCH ##

//Load the user with the most recent picture first.
//Sort by newest user (server-side)

//  ## STYLING make users names line up
// Link to Favorites, Recent, and Collections

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => { 
    axios.get("/api/users")
      .then(res => setAllUsers(res.data))
      .catch(console.log)
  }, [])

  return (
    <Wrapper>
      {allUsers.map(user => (
        <ul key={user.id}> 
          <Link to={`/profile/${user.id}`}> 
            <Flex>
              <Avatar image={user.image}/> 
              <Name>
                {user.first_name}{" "}{user.last_name} 
              </Name>
              <Email>
                {user.uid} 
              </Email>
            </Flex>
          </Link>
        </ul>
      ))}
    </Wrapper>
  )
  
}
const Name = styled.div`
  display: flex;
  flex-start: left;
  width: 50vw;
  flex-wrap: no-wrap;
`
const Email = styled.div`
  display: flex;
`
const Flex = styled.div`
  display: flex;
  width: 50vw;
  align-items: center;
`
const Avatar = styled.div`
  background-image: url(${props => props.image});
  border-radius: 100%;
  height: 50px;
  width: 50px;
  background-position: center;
  border-radius: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  flex-shrink: 0;
`
const Wrapper = styled.div`
  padding: 2rem;
`

export default Users