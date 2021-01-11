import React from 'react';
import Hero from '../home/Hero';
import CollectionsFeed from './CollectionsFeed';

const Collections = () => (
  <>
    <Hero forCollections={true}/>
    <CollectionsFeed />
  </>
)


export default Collections 