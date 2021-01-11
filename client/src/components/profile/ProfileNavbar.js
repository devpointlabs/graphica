import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//ADD SWITCH ROUTER INTO HERE. switch within switch..

const ProfileNavbar = ({ changeTab, isCurrentUser, currentTab }) => {
  const [ recentColor, setRecentColor ] = useState("black")
  const [ collectionsColor, setCollectionsColor ] = useState("black")
  const [ settingsColor, setSettingsColor ] = useState("black")
  const [ favoritesColor, setFavoritesColor ] = useState("black")

  useEffect(() => { // There is a shorter way to do this
    if (currentTab === "recent"){
      setRecentColor("#0099BA")
      setSettingsColor("black")
      setCollectionsColor("black")
      setFavoritesColor("black")
    } else if (currentTab === "collections"){
      setCollectionsColor("#0099BA")
      setRecentColor("black")
      setSettingsColor("black")
      setFavoritesColor("black")
    } else if (currentTab === "settings"){
      setSettingsColor("#0099BA")
      setRecentColor("black")
      setCollectionsColor("black")
      setFavoritesColor("black")
    } else if (currentTab === "favorites"){
      setSettingsColor("black")
      setRecentColor("black")
      setCollectionsColor("black")
      setFavoritesColor("#0099BA")
    }
  }, [currentTab])

  return(
    <Wrapper>
      <Flex>
        <RecentDiv color={recentColor} onClick={() => changeTab("recent")}>
          recent
        </RecentDiv>
        <CollectionDiv color={collectionsColor} onClick={() => changeTab("collections")}>
          collection
        </CollectionDiv>
        <FavoritesDiv color={favoritesColor} onClick={() => changeTab("favorites")}>
          favorites
        </FavoritesDiv>
        { isCurrentUser &&
          <SettingsDiv color={settingsColor} onClick={() => changeTab("settings")}> 
            settings
          </SettingsDiv> //NEED TO MOVE THIS TO THE RIGHT
        }
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-weight: 500;
`
const Flex = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem 7.5rem;
`
const RecentDiv = styled.div`
  color: ${props => props.color};
  margin-right: 3rem;
  cursor: pointer;
`
const CollectionDiv = styled.div`
  color: ${props => props.color};
  margin-right: 3rem;
  cursor: pointer;
`
const FavoritesDiv = styled.div`
  color: ${props => props.color};
  margin-right: 3rem;
  cursor: pointer;
`
const SettingsDiv = styled.div`
  color: ${props => props.color};
  margin-right: 3rem;
  cursor: pointer;
  justify-content: flex-end;
`

export default ProfileNavbar;