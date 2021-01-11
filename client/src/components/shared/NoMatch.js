import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NoMatch = () => (
  <Wrapper>
    <h1>404 page not found</h1>
    <Link to='/'>Return home</Link>
  </Wrapper>
)

const Wrapper = styled.div`
  padding: 2rem;
`

export default NoMatch;