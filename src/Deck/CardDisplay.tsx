import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "./Card.ts"; // Import Card class
import './CardDisplayContainer.css'; // Import styles for individual card display
import { useState } from "react";

interface CardDisplayProps {
    card: any; // Adjust type for your card object if necessary
    index: number; // Expect the index prop
    onClick: () => void;
    hasPlayed: boolean;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card, index, onClick, hasPlayed }) => {
    // Map the suit to its corresponding symbol
    const getSuitSymbol = (suit: string): string => {
        switch (suit.toLowerCase()) {
            case 'hearts':
                return '♥';
            case 'diamonds':
                return '♦';
            case 'clubs':
                return '♣';
            case 'spades':
                return '♠';
            default:
                return ''; // Fallback if suit is invalid
        }
    };

    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

    const STACK_DISTANCE = -95;
    const targetY = 250;
    const targetX = 280 + index * STACK_DISTANCE;

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generate random index
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
    }

    var animTimes = [1.35, 1.55, 1.75, 1.95, 2.15];
    shuffleArray(animTimes);

    if (hasPlayed) {
        return (
            <div style={{ position: "relative", display: "inline-block" }}>
                {/* Card layout */}
                <div
                    className={`card ${card.selected ? "selected" : ""}`}
                    onClick={onClick}
                    style={{ cursor: "pointer", borderRadius: "10px" }}
                >
                    <div className="card-value">{card.rank}</div>
                    <div className={`card-suit ${card.suit.toLowerCase()}`}>
                        {getSuitSymbol(card.suit)}
                    </div>
                </div>

                {/* Points animation */}
                {card.points > 0 && hasPlayed && (
                    <AnimatePresence>
                        <motion.div
                            className="card-points"
                            key={card.points}  // Ensure each card has a unique key for proper exit animation
                            initial={{ y: 0, opacity: 1, scale: 1 }}  // Start fully visible and at full size
                            animate={
                                card.selected
                                    ? {
                                        x: `${targetX}px`,  // Target x position for all points
                                        y: `${targetY}px`,  // Target y position for stacking
                                        scale: .5,  // Shrink the points while moving
                                        opacity: 0,  // Full opacity for selected points
                                    }
                                    : {
                                        opacity: 0,  // Fade out for unselected cards
                                        scale: .5,  // Optionally scale down the points
                                    }
                            }
                            exit={{
                                opacity: 0,  // Fade out when exiting
                                scale: 0.5,  // Shrink points during exit animation
                            }}
                            transition={{
                                opacity: { duration: animTimes[0], ease: "easeOut" },  // Smooth fade transition for opacity
                                scale: { duration: animTimes[1], ease: "easeOut" },    // Smooth scale transition
                                x: { duration: animTimes[2], ease: "easeOut" },          // Smooth horizontal movement
                                y: { duration: animTimes[3], ease: "easeOut" },          // Smooth vertical movement
                            }}
                            style={{
                                position: "absolute",
                                top: "100%",  // Start the points off the card
                                left: "0%",  // Align horizontally
                                transform: "translateX(-50%)",
                                // Ensure center alignment
                            }}
                        >
                            {card.points}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

        );
    }
    else {
        return (
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <div
                    className={`card ${card.selected ? 'selected' : ''}`}
                    onClick={onClick}
                    style={{ cursor: 'pointer', borderRadius: '10px' }}
                >
                    <div className="card-value">{card.rank}</div>
                    <div className={`card-suit ${card.suit.toLowerCase()}`}>
                        {getSuitSymbol(card.suit)}
                    </div>
                </div>
                <div className={`card-points ${!card.selected ? 'opacity-0' : ''}`}>
                    {card.points}
                </div>


            </div>
            )

    }


};

export default CardDisplay;
