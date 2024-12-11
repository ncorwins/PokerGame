import { useEffect, useState } from "react";
import * as React from 'react';
import { evaluateHand, HandRankings } from './Deck/handEvaluator.ts'; // Import the evaluator
import { useGlobalState } from './GlobalStateContext.tsx';
import { calculateHand } from './handCalculator.ts';

interface ScoreBoxProps {
    dealtCards: {
        points: number;
        selected: boolean;
        rank: string;
        value: number;
    }[]; // Adjust the type according to your card structure
}

const ScoreBox: React.FC<ScoreBoxProps> = ({ dealtCards }) => {
    const { statsArray, questArray, globalCardCount, setQuestArray, doubleQuestMoney, questLevel, globalAnte } = useGlobalState();
    // Track if the button should be visible
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    // Track the total points
    const [totalPoints, setTotalPoints] = useState(0);
    const [questBonus, setQuestBonus] = useState(0);
    const [totalMulti, setTotalMulti] = useState(1);

    function checkQuests(): number {
        var holder = questArray;
        var hand = sayBestHand();

        var totalQuestMoney = 0;

        for (let i = 0; i < holder.length; i++) {
            for (let j = 0; j < holder[i].hand.length; j++) {
                if (hand === holder[i].hand[j]) {
                    if (holder[i].unlocked) {
                        continue;  // If the quest is unlocked, no reward
                    }
                    if (holder[i].level > questLevel) {
                        continue;
                    }

                    if (doubleQuestMoney) {
                        totalQuestMoney += holder[i].reward * 2;
                    }
                    totalQuestMoney += holder[i].reward;  // Return the reward for the unlocked quest
                }
            }
        }

        return totalQuestMoney;  // If no match, return 0
    }

    const sayBestHand = () => {
        const selectedCards = dealtCards.filter(card => card.selected);
        if (selectedCards.length !== 5) {
            return (0);
        }

        const handRank = evaluateHand(selectedCards);
        const handName = Object.keys(HandRankings).find(
            key => HandRankings[key as keyof typeof HandRankings] === handRank
        );

        return handName;
    };

    useEffect(() => {
        // Check if dealtCards is null or has a length less than 8
        if (dealtCards == null || dealtCards.length < 1) {
            dealtCards = [];
            setIsButtonVisible(false);
        } else {
            setIsButtonVisible(true);
        }

        // Calculate total points from selected cards
        const calculatedPoints = dealtCards
            .filter((card) => card.selected) // Only include selected cards
            .reduce((sum, card) => sum + (card.points || 0), 0);

        const calculatedMult = dealtCards
            .filter((card) => card.selected); // Only include selected cards

        // Assuming evaluateHand returns a multiplier or a value derived from the hand
        const multi = evaluateHand(calculatedMult);
        console.log(calculatedMult);
        // If calculateHand requires both the selected cards and the multiplier
        const newPoints = calculateHand(calculatedMult, multi, statsArray);

        setQuestBonus(checkQuests());
        // Update the total points in state
        console.log(newPoints);

        setTotalPoints(newPoints.fullScore);
    }, [dealtCards]); // Re-run this effect when dealtCards change

    const resultValue = questBonus + totalPoints - globalAnte;

    // Determine the button color based on the result value
    const resultButtonClass = resultValue >= 0 ? "btn-success" : "btn-error"; // You can use Tailwind's built-in colors or custom ones

    const minWH = 45;
    const fontSizeVar = 15;
    const marginSize = 1.5;



    return (
        <div className="scoreBox-card-container" style={{marginTop: '40px'} }>
            <div>
                {isButtonVisible && (
                    <div>
                        <div style={{ margin: '10px' }}>
                            <div className="join">
                                <div className="join">
                                    <button className="btn rounded-full join-item" style={{ margin: `${marginSize}` + 'px', fontSize: `${fontSizeVar}` + 'px', minWidth: `${minWH}` + 'px', minHeight: `${minWH}` + 'px', color: 'red' }}>Ante</button>
                                    <button className="btn rounded-full join-item" style={{ margin: `${marginSize}` + 'px', fontSize: `${fontSizeVar}` + 'px', minWidth: `${minWH}` + 'px', minHeight: `${minWH}` + 'px', color: 'red' }}>{globalAnte}</button>
                                </div>
                                <button className="btn rounded-full join-item" style={{ margin: `${marginSize}` + 'px', fontSize: `${fontSizeVar}` + 'px', minWidth: `${minWH}` + 'px', minHeight: `${minWH}` + 'px', color: 'green' }}>Bonus</button>
                                <button className="btn rounded-full join-item" style={{ margin: `${marginSize}` + 'px', fontSize: `${fontSizeVar}` + 'px', minWidth: `${minWH}` + 'px', minHeight: `${minWH}` + 'px', color: 'green' }}>{questBonus}</button>
                            </div>
                        </div>
                        <div style={{ margin: '10px' }}>
                            <div className="join">
                                <button className="btn rounded-full join-item" style={{ margin: `${marginSize}` + 'px', fontSize: `${fontSizeVar}` + 'px', minWidth: `${minWH}` + 'px', minHeight: `${minWH}` + 'px', color: 'white', lineHeight: '.5' }}>+<br /> -</button>
                                <button
                                    id="result"
                                    className={`btn rounded-full join-item ${resultButtonClass}`} // Apply dynamic class
                                    style={{ margin: `${marginSize}` + 'px', fontSize: `${fontSizeVar}` + 'px', minWidth: `${minWH}` + 'px', minHeight: `${minWH}` + 'px', textIndent: '-5px' }}
                                >{Math.round(resultValue)}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScoreBox;
