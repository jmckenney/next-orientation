import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

export default function useGeoLocation() {

    const [location, setLocation] = useState({});

    const {
        sendMessage,
    } = useWebSocket('wss://mckenney.hopto.org');

    useEffect(() => {
        navigator.geolocation.watchPosition(pos => {
            sendMessage(JSON.stringify({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
            }))
            setLocation({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
            });
        }, err => {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    }, []);

    return location;
}