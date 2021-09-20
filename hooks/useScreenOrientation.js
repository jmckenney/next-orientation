import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

export default function useScreenOrientation() {

    const {
        sendMessage,
    } = useWebSocket('wss://mckenney.hopto.org');

    const [aclState, setAclState] = useState({
        a: 0,
        b: 0,
        g: 0,
    });

    useEffect(() => {
        function handleOrientation({ beta: b, gamma: g, alpha: a }) {
            setAclState({ a, b, g });
            sendMessage(JSON.stringify({a,b,g}))
        }

        window.addEventListener('deviceorientation', handleOrientation);
    }, []);

    return aclState;
}