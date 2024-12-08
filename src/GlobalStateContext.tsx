import * as React from 'react';
import { createContext, useContext, useState } from "react";

// Create a context with a default value
const GlobalStateContext = createContext<any>(null);

// Create a provider component
export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [globalName, setGlobalName] = useState<string>("Beanie");
    const [globalBeanCount, setGlobalBeanCount] = useState<number>(0);
    const [globalMultiplier, setGlobalMultiplier] = useState<number>(1);
    const [globalAutoMultiplier, setGlobalAutoMultiplier] = useState<number>(1);
    const [globalBeanClickIncrement, setGlobalBeanClickIncrement] = useState<number>(1);
    const [globalBeanAutoIncrement, setAutoBeanClickIncrement] = useState<number>(0);
    const [globalStoreArray, setGlobalStoreArray] = useState<any[]>([
        { name: 'Bean Sprout', description: 'A small sprout that grows beans at a steady pace.', cost: 10, increment: 1, owned: 0, locked: false },
        { name: 'Friendly Farmer', description: 'A friendly farmer that waters and nurtures your bean plants.', cost: 50, increment: 3, owned: 0, locked: true },
        { name: 'Bean Machine', description: 'An automated machine that harvests beans for you.', cost: 1500, increment: 10, owned: 0, locked: true },
        { name: 'Bean Barn', description: 'A barn full of bean-producing livestock. They work together to grow beans.', cost: 15000, increment: 50, owned: 0, locked: true },
        { name: 'Bean Bank', description: 'A bean bank that stores your beans securely and earns more beans over time.', cost: 150000, increment: 200, owned: 0, locked: true },
        { name: 'Bean Laboratory', description: 'A high-tech lab where scientists experiment to grow beans faster and more efficiently.', cost: 1500000, increment: 1000, owned: 0, locked: true },
        { name: 'Quantum Bean Portal', description: 'A mysterious portal that brings beans from alternate realities.', cost: 15000000, increment: 5000, owned: 0, locked: true },
        { name: 'Automated Bean Factory', description: 'A factory full of robots that automate every step of the bean production process.', cost: 150000000, increment: 25000, owned: 0, locked: true },
        { name: 'Time Distortion Engine', description: 'A device that manipulates the flow of time, speeding up your bean production.', cost: 1500000000, increment: 125000, owned: 0, locked: true },
        { name: 'Intergalactic Bean Farm', description: 'A space station dedicated to farming beans in zero gravity. Beans grow faster in space.', cost: 15000000000, increment: 500000, owned: 0, locked: true },
    ]);
    const [globalUpgradeArray, setGlobalUpgradeArray] = useState<any[]>([
        //{ name: 'Click Multiplier', description: 'Increase Clicks .3x', cost: 10, increment: .3, owned: 0 },
        //{ name: 'Auto Multiplier', description: 'Increase Auto .1x', cost: 10, increment: .1, owned: 0 },
        { name: 'Golden Bean Stash', description: 'Clicks have a 10% chance to yield double beans.', cost: 250, increment: 0, owned: 0, locked: false, index: 0 },
        { name: 'Beanstorm Generator', description: 'Clicks have a 2% chance to drop 100 extra beans', cost: 500, increment: 0, owned: 0, locked: true, index: 1 },
        { name: 'Overclocked Clicker', description: 'Clicks have a 3% chance to yield 10x beans.', cost: 1000, increment: 0, owned: 0, locked: true, index: 2 },
        { name: 'Time Warp Module', description: 'Clicks have a 7% chance to drop 2000 extra beans', cost: 5000, increment: 0, owned: 0, locked: true, index: 3 },
        { name: 'Precision Planters', description: 'Double Click -- Clicks are worth double', cost: 7500, increment: 0, owned: 0, locked: true, index: 4 },
        { name: 'Beanconomy Boost', description: 'Double Auto -- Automagic are worth double.', cost: 15000, increment: 0, owned: 0, locked: true, index: 5 },
        { name: 'Parallel Processing', description: '20% Chance to drop double beans', cost: 25000, increment: 0, owned: 0, locked: true, index: 6 },
        { name: 'Galactic Bean Trade', description: 'Double Double Auto -- Automagic double again?!', cost: 50000, increment: 0, owned: 0, locked: true, index: 7 }
    ]);
    const [globalToolArray, setGlobalToolArray] = useState<any[]>([
        { name: "Extra Hand", description: "+1 Bean Per Click.", cost: 10, increment: 1, owned: 0, locked: false },
        { name: "Helpful Neighbor", description: "+3 Beans Per Click.", cost: 50, increment: 3, owned: 0, locked: true },
        { name: "Energetic Family", description: "+10 Beans Per Click.", cost: 200, increment: 10, owned: 0, locked: true },
        { name: "Dedicated Squad", description: "+25 Beans Per Click.", cost: 1000, increment: 25, owned: 0, locked: true },
        { name: "Small Commune", description: "+50 Beans Per Click.", cost: 5000, increment: 50, owned: 0, locked: true },
        { name: "Industrial Assembly Line", description: "+150 Beans Per Click.", cost: 20000, increment: 150, owned: 0, locked: true },
        { name: "Bean Tycoon's Guild", description: "+500 Beans Per Click.", cost: 100000, increment: 500, owned: 0, locked: true },
        { name: "Nation of Beanery", description: "+2000 Beans Per Click.", cost: 500000, increment: 2000, owned: 0, locked: true },
        { name: "Global Bean Alliance", description: "+10000 Beans Per Click.", cost: 2500000, increment: 10000, owned: 0, locked: true },
        { name: "Cosmic Bean Network", description: "+50000 Beans Per Click.", cost: 10000000, increment: 50000, owned: 0, locked: true },
        { name: "Multiverse Bean Federation", description: "+200000 Beans Per Click.", cost: 50000000, increment: 200000, owned: 0, locked: true }
    ]
);

    for (let i = 0; i < globalStoreArray.length; i++) {
        if (globalStoreArray[i].owned === 0) {
            globalStoreArray[i].sc = globalStoreArray[i].cost; // init starting cost
        }
    }
    for (let i = 0; i < globalUpgradeArray.length; i++) {
        if (globalUpgradeArray[i].owned === 0) {
            globalUpgradeArray[i].sc = globalUpgradeArray[i].cost; // init starting cost
        }
    }
    for (let i = 0; i < globalToolArray.length; i++) {
        if (globalToolArray[i].owned === 0) {
            globalToolArray[i].sc = globalToolArray[i].cost; // init starting cost
        }
    }


    return (
        <GlobalStateContext.Provider value={{
            globalBeanCount,
            setGlobalBeanCount,
            globalBeanClickIncrement,
            setGlobalBeanClickIncrement,
            globalStoreArray,
            setGlobalStoreArray,
            globalBeanAutoIncrement,
            setAutoBeanClickIncrement,
            globalName,
            setGlobalName,
            globalUpgradeArray,
            setGlobalUpgradeArray,
            globalMultiplier,
            setGlobalMultiplier,
            globalToolArray,
            setGlobalToolArray,
            globalAutoMultiplier,
            setGlobalAutoMultiplier
        }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Create a custom hook to use the context
export const useGlobalState = () => useContext(GlobalStateContext);
