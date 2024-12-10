import * as React from 'react';
import './Quests.css';
import { useState, useEffect } from 'react';
import { useGlobalState } from './GlobalStateContext.tsx';

const Quests: React.FC = () => {
    // Access questLevel, doubleQuestMoney, and questArray from the global state context
    const { doubleQuestMoney, questLevel, setQuestLevel, questArray, setQuestArray } = useGlobalState();

    // Function to toggle the unlocked state of a quest
    const handleQuestClick = (index: number) => {
        setQuestArray((prevArray) => {
            const newArray = [...prevArray]; // Copy the existing array
            newArray[index].unlocked = !newArray[index].unlocked; // Toggle the unlocked state
            return newArray; // Return the updated array to trigger a re-render
        });
    };

    // Filter quests based on the current questLevel
    const filteredQuests = questArray?.filter(quest => quest.level <= questLevel) || [];

    // Ensure useEffect is called unconditionally
    useEffect(() => {
        // You can place any side effects here if necessary
    }, [doubleQuestMoney]); // Dependency array ensures it runs when doubleQuestMoney changes

    // Render a loading state if questArray is empty
    if (!questArray || questArray.length === 0) {
        return <div>Loading quests...</div>; // Placeholder if the quests are not yet loaded
    }

    return (
        <div className="backDiv">
            <div className="questWall backDiv">
                {filteredQuests.map((quest, index) => (
                    <div
                        key={index}
                        className={` backDiv btn-flip-side ${quest.unlocked ? 'btn-flip-side--green' : 'btn-flip-side--light-red'}`}
                        onClick={() => handleQuestClick(index)} // Toggle the quest unlocked state on click
                    >
                        <span>{quest.name} (Level: {quest.level})</span>
                        <span id="reward">Reward: ${doubleQuestMoney ? (quest.reward * 2) : (quest.reward)}</span>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default Quests;
