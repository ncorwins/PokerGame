import * as React from 'react';
import { createContext, useContext, useState } from "react";

// Create a context with a default value
const GlobalStateContext = createContext<any>(null);

// Create a provider component
export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [globalCardCount, setGlobalCardCount] = useState<number>(8);
    const [globalPointScore, setGlobalPointScore] = useState<number>(0);
    const [totalDiscards, setTotalDiscards] = useState<number>(2);
    const [usedDiscards, setUsedDiscards] = useState<number>(0);
    const [roundsCompleted, setRoundsCompleted] = useState<number>(0);
    const [globalMoney, setGlobalMoney] = useState<number>(100);
    const [showPlayButton2, setShowPlayButton2] = useState<boolean>(false);
    const [twosRemoved, setTwosRemoved] = useState<boolean>(false);
    const [generateCards, setGenerateCards] = useState<boolean>(true);
    const [showBuyButton, setShowBuyButton] = useState<boolean>(false);
    const [globalAnte, setGlobalAnte] = useState<number>(10);
    const [storeCards, setStoreCards] = useState<any[]>([
        {
            name: "Money Multiplier",
            desc: "Earn 20% more Money",
            cost: 200,
            selected: false,
            visible: false,
            purchased: false,
            level: 0,
            id: 0
        },
        {
            name: "Money Adder",
            desc: "Adds + 50 Money per Turn",
            cost: 300,
            selected: false,
            visible: false,
            purchased: false,
            level: 0,
            id: 1
        }
        ,
        {
            name: "Poop Buster",
            desc: "Removes all 2s",
            cost: 500,
            selected: false,
            visible: false,
            purchased: false,
            level: 0,
            id: 2
        },
        {
            name: "Extra Card",
            desc: "Get an Extra Card",
            cost: 1000,
            selected: false,
            visible: false,
            purchased: false,
            level: 0,
            id: 3
        },
        {
            name: "Extra Discard",
            desc: "Get an Extra Discard",
            cost: 1500,
            selected: false,
            visible: false,
            purchased: false,
            level: 0,
            id: 4
        }
    ]);


    return (
        <GlobalStateContext.Provider value={{
            globalCardCount,
            setGlobalCardCount,
            globalPointScore,
            setGlobalPointScore,
            showPlayButton2,
            setShowPlayButton2,
            generateCards,
            setGenerateCards,
            storeCards,
            setStoreCards,
            globalMoney,
            setGlobalMoney,
            showBuyButton,
            setShowBuyButton,
            twosRemoved,
            setTwosRemoved,
            globalAnte,
            setGlobalAnte,
            roundsCompleted,
            setRoundsCompleted,
            totalDiscards,
            setTotalDiscards,
            usedDiscards,
            setUsedDiscards
        }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Create a custom hook to use the context
export const useGlobalState = () => useContext(GlobalStateContext);
