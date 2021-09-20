import React, { useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import useTouchMove from '../hooks/useTouchMove';

export default () => {
    const touchMove = useTouchMove();

    const {
        lastMessage,
    } = useWebSocket('wss://mckenney.hopto.org');

    const usersOrientations = useRef({});
    const { x: alpha, sender } = lastMessage ? JSON.parse(lastMessage.data) : {};
    if (lastMessage) {
        const obj = {
            ...usersOrientations.current,
            [sender]: { alpha: alpha*100 }
        };
        usersOrientations.current = obj;
    }

    return (
        <div className="bg-blue-600 text-white h-screen p-7 flex flex-wrap">
            {Object.entries(usersOrientations.current).map((user) => {
                return (
                    <p
                        key={user[0]}
                        className="p-6 border rounded-3xl bg-white opacity-50 text-white  w-36 h-36"
                        style={{ transform: `rotateZ(-0deg) rotateX(-0deg) rotateY(${user[1].alpha}deg)` }}>
                    </p>
                )
            })}
        </div>
    );
};