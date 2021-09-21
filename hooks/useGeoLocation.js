import { useEffect, useState } from 'react';

export default function useGeoLocation() {

    const [location, setLocation] = useState({});

    useEffect(() => {
        navigator.geolocation.watchPosition(pos => {
            console.log(pos)
            setLocation(pos);
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