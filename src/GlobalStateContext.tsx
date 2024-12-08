import * as React from 'react';
import { createContext, useContext, useState } from "react";

// Create a context with a default value
const GlobalStateContext = createContext<any>(null);

// Create a provider component
export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [globalCardCount, setGlobalCardCount] = useState<number>(8);



    return (
        <GlobalStateContext.Provider value={{
            globalCardCount,
            setGlobalCardCount
        }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Create a custom hook to use the context
export const useGlobalState = () => useContext(GlobalStateContext);
