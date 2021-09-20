import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

export default function useScreenOrientation() {

    const {
        sendMessage,
    } = useWebSocket('wss://mckenney.hopto.org');

    useEffect(() => {
        function handleTouchMove(e) {
            e.preventDefault();
            sendMessage(e.targetTouches[0].clientX/window.innerWidth)
        }
        window.addEventListener("touchmove", handleTouchMove);
    }, []);
}