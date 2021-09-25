import React, { useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import useGeoLocation from '../hooks/useGeoLocation';
import { Map, Marker } from "pigeon-maps"
import { stamenTerrain } from 'pigeon-maps/providers'

export default () => {
  const userPosition = useGeoLocation();

  const {
    lastMessage,
  } = useWebSocket('wss://mckenney.hopto.org');

  const userLocations = useRef({});
  const { pos, sender } = lastMessage ? JSON.parse(lastMessage.data) : {};
  if (lastMessage) {
    const obj = {
      ...userLocations.current,
      [sender]: { lat: pos.lat, lon: pos.lon }
    };
    userLocations.current = obj;
  }

  return (
    <div className="text-white h-screen flex flex-wrap">
      <Map
        provider={stamenTerrain}
        center={
          userPosition && userPosition.lat
            ? [userPosition.lat, userPosition.lon]
            : [38.856294399999996, -121.32024320000001]
        }
        defaultZoom={11}>
        {userPosition && userPosition.lat && <Marker width={40} anchor={[userPosition.lat, userPosition.lon]} />}
        
        {Object.entries(userLocations.current).map((user) => {
          return (
            <Marker key={user[0]} width={30} anchor={[user[1].lat, user[1].lon]} />
          )
        })}
      </Map>
    </div>
  );
};