import * as React from 'react';
import { createContext, useContext, useState } from "react";

// Create a context with a default value
const GlobalStateContext = createContext<any>(null);

// Create a provider component
export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [globalCardCount, setGlobalCardCount] = useState<number>(7);
    const [globalPointScore, setGlobalPointScore] = useState<number>(0);
    const [totalDiscards, setTotalDiscards] = useState<number>(2);
    const [usedDiscards, setUsedDiscards] = useState<number>(0);
    const [roundsCompleted, setRoundsCompleted] = useState<number>(0);
    const [globalMoney, setGlobalMoney] = useState<number>(100);
    const [showPlayButton2, setShowPlayButton2] = useState<boolean>(false);
    const [twosRemoved, setTwosRemoved] = useState<boolean>(false);
    const [generateCards, setGenerateCards] = useState<boolean>(true);
    const [sortByValue, setSortByValue] = useState<boolean>(true);
    const [hasPlayed, setHasPlayed] = useState<boolean>(false);
    const [sorted, setSorted] = useState<boolean>(true);
    const [showBuyButton, setShowBuyButton] = useState<boolean>(false);
    const [doubleQuestMoney, setDoubleQuestMoney] = useState<boolean>(false);
    const [globalAnte, setGlobalAnte] = useState<number>(25);
    const [questLevel, setQuestLevel] = useState<number>(1);
    const [gameStarted2, setGameStarted2] = useState<boolean>(false);
    const [questArray, setQuestArray] = useState<any[]>([
        {
            name: 'Two Pair',
            hand: ['TWO_PAIR', 'FULL_HOUSE'],
            reward: 50,
            unlocked: false,
            level: 1
        },
        {
            name: 'Three of a Kind',
            hand: ['THREE_OF_A_KIND','FULL_HOUSE','FOUR_OF_A_KIND'],
            reward: 125,
            unlocked: false,
            level: 2
        },
        {
            name: 'Straight',
            hand: ['STRAIGHT', 'STRAIGHT_FLUSH', 'ROYAL_FLUSH'],
            reward: 300,
            unlocked: false,
            level: 3
        },
        {
            name: 'Flush',
            hand: ['FLUSH', 'STRAIGHT_FLUSH', 'ROYAL_FLUSH'],
            reward: 750,
            unlocked: false,
            level: 4
        },
        {
            name: 'Full House',
            hand: ['FULL_HOUSE'],
            reward: 1750,
            unlocked: false,
            level: 5
        },
        {
            name: 'Four of a Kind',
            hand: ['FOUR_OF_A_KIND'],
            reward: 5000,
            unlocked: false,
            level: 6
        },
        {
            name: 'Straight Flush',
            hand: ['STRAIGHT_FLUSH','ROYAL_FLUSH'],
            reward: 12500,
            unlocked: false,
            level: 7
        },
        {
            name: 'Royal Flush',
            hand: ['ROYAL_FLUSH'],
            reward: 50000,
            unlocked: false,
            level: 8
        }

    ]);
    /*export const HandRankings = {
            HIGH_CARD: 1,
            PAIR: 2,
            TWO_PAIR: 4,
            THREE_OF_A_KIND: 10,
            STRAIGHT: 12,
            FLUSH: 16,
            FULL_HOUSE: 20,
            FOUR_OF_A_KIND: 80,
            STRAIGHT_FLUSH: 500,
            ROYAL_FLUSH: 5000,
        };*/

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
        },
        {
            name: "Quests x2",
            desc: "Get x2 Quest Money",
            cost: 3000,
            selected: false,
            visible: false,
            purchased: false,
            level: 0,
            id: 5
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
            setUsedDiscards,
            sortByValue,
            setSortByValue,
            sorted,
            setSorted,
            questArray,
            setQuestArray,
            questLevel,
            setQuestLevel,
            doubleQuestMoney,
            setDoubleQuestMoney,
            hasPlayed,
            setHasPlayed,
            gameStarted2,
            setGameStarted2
        }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Create a custom hook to use the context
export const useGlobalState = () => useContext(GlobalStateContext);
