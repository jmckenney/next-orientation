import { useState, useEffect } from 'react';

export default function useScreenOrientation() {
    const [aclState, setAclState] = useState({
        a: 0,
        b: 0,
        g: 0,
    });

    useEffect(() => {
        console.log("josh was here");
        function handleOrientation({beta: b, gamma: g, alpha: a}) {
            setAclState({a, b, g});
        }

        window.addEventListener('deviceorientation', handleOrientation);
    }, []);

    return aclState;
}