import { useEffect, useState } from "react";

const useSignalState = (signal, value) => {
    const [state, setState] = useState(signal.value);

    useEffect(() => {
        const unsubscribe = signal.subscribe((value) => {
            setState(value);
        });

        return () => unsubscribe();
    }, [signal]);

    const setSignalValue = (value) => {
        signal.value = value;
    };

    return [state, setSignalValue];
};

export default useSignalState;
