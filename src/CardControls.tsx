import * as React from 'react';
import { useEffect, useState } from 'react';
import { Deck } from './Deck/Deck.ts';
import Card from './Deck/Card.ts';
import { evaluateHand, HandRankings } from './Deck/handEvaluator.ts'; // Import the evaluator
import { useGlobalState } from './GlobalStateContext.tsx';
import { calculateHand } from './handCalculator.ts';
import './Deck/CardDisplayContainer.css';
import CardDisplay from './Deck/CardDisplay.tsx';
import './CardControls.css';
import Store from './Store';

const CardControls: React.FC = () => {
    const [deck] = useState(new Deck());
    const [dealtCards, setDealtCards] = useState<Card[]>([]);
    const [bestHand, setBestHand] = useState<string>(''); // To store the best hand
    const { usedDiscards, setUsedDiscards, totalDiscards, globalAnte, setTwosRemoved, twosRemoved, storeCards, globalCardCount, setGlobalMoney, globalMoney, setGlobalCardCount, showPlayButton2, setShowPlayButton2, generateCards, setGenerateCards, setGlobalPointScore, globalPointScore } = useGlobalState();

    // State variables to manage button visibility
    const [showDiscardButton, setShowDiscardButton] = useState(false);
    const [] = useState(true);
    const [showPlayButton, setShowPlayButton] = useState(true);

    const ADDCARDSPEED = 80;

    React.useEffect(() => {
        let dealing = false; // Lock to prevent multiple card deals at once

        if (!twosRemoved) {
            if (storeCards[2].purchased) {
                setTwosRemoved(true);  // Toggle the twosRemoved state
                deck.setTwosRemoved(true);  // Update deck state as well
                console.log(deck);
            }
        }


        const interval = setInterval(() => {
            if (!generateCards) {
                return;
            }
            deck.shuffle();
            if (dealtCards.length < globalCardCount && !dealing) {
                dealing = true; // Lock dealing
                var card = deck.deal();

                if (card) {
                    setDealtCards(prevDealtCards => {
                        const newDealtCards = [...prevDealtCards];

                        // Ensure no duplicate cards
                        const isDuplicate = newDealtCards.some(
                            dealtCard =>
                                dealtCard.rank === card.rank && dealtCard.suit === card.suit
                        );

                        if (!isDuplicate) {
                            newDealtCards.push(card);
                        } else {
                            console.warn("Duplicate card detected:", card);
                        }

                        dealing = false; // Unlock dealing after updating state
                        return newDealtCards;
                    });
                } else {
                    console.error("Deck is empty!");
                    dealing = false; // Unlock dealing even if no card
                    //clearInterval(interval); // Stop updating if the deck is empty
                }
            }
        }, ADDCARDSPEED);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [dealtCards, globalCardCount, deck, generateCards]);





    if (dealtCards.length == globalCardCount) {
        var count = 0;
        for (let i = 0; i < dealtCards.length; i++) {
            if (dealtCards[i].selected) {
                count++;
            }
        }
        if (count == 5 && (showPlayButton === false)) {
            setShowPlayButton(true);
        }
        if (count != 5 && showPlayButton) {
            setShowPlayButton(false);
        }
        if (count >= 0 && (showDiscardButton === false)) {
            setShowDiscardButton(true);
        }
    }
    else {
        //if (showDealButton === false) {
            //setShowDealButton(true);
        //}
        if (showPlayButton) {
            setShowPlayButton(false);
        }
        if (showDiscardButton) {
            setShowDiscardButton(false);
        }
    }

    const evaluateBestHand = () => {
        const selectedCards = dealtCards.filter(card => card.selected);
        if (selectedCards.length !== 5) {
            setBestHand('Invalid. Please select 5 cards.');
            return;
        }

        const handRank = evaluateHand(selectedCards);
        const points = calculateHand(selectedCards, handRank);
        const handName = Object.keys(HandRankings).find(
            key => HandRankings[key as keyof typeof HandRankings] === handRank
        );

        var handNameNice = '';

        if (handName === 'STRAIGHT') {
            handNameNice = 'Straight';
        }
        else if (handName === 'STRAIGHT_FLUSH') {
            handNameNice = 'Straight Flush';
        }
        else if (handName === 'ROYAL_FLUSH') {
            handNameNice = 'Royal Flush';
        }
        else if (handName === 'FULL_HOUSE') {
            handNameNice = 'Full House';
        }
        else if (handName === 'FOUR_OF_A_KIND') {
            handNameNice = 'Four of a kind';
        }
        else if (handName === 'THREE_OF_A_KIND') {
            handNameNice = 'Three of a kind';
        }
        else if (handName === 'TWO_PAIR') {
            handNameNice = 'Two Pair';
        }
        else if (handName === 'HIGH_CARD') {
            handNameNice = 'High Card';
        }
        else {
            handNameNice = handName;
        }

        setBestHand(handNameNice + ': $' + points);
        return points;
    };

    const discardSelected = () => {
        if (totalDiscards == usedDiscards) {
            return;
        }

        const remainingCards = dealtCards.filter(card => !card.selected);
        const removedCards = dealtCards.filter(card => card.selected);

        setBestHand('');
        if (removedCards.length == 0) {
            setBestHand('Please select at least one card.');
            return;
        }
        var h = usedDiscards;

        setUsedDiscards(h += 1);

        console.log(remainingCards);
        console.log(removedCards);
        removedCards.forEach(card => card.selected = false); // Return discarded cards to the deck
        removedCards.forEach(card => deck.add(card)); // Return discarded cards to the deck
        setDealtCards(remainingCards);
    };


    function calculateMoney(points: number) {
        var updatedPoints = points;


        if (storeCards[0].purchased) {
            updatedPoints *= 1.2;
        }
        else if (storeCards[1].purchased) {
            updatedPoints += 50;
        }


        updatedPoints -= globalAnte;



        return (updatedPoints);
    }






    const playHand = () => {
        const points = evaluateBestHand();
        const hold = points;
        var holdMoney = hold;
        const wordInterval = 700;
        const newScore = globalPointScore + points;

        setUsedDiscards(0);

        const newMoney = globalMoney + calculateMoney(points);
        setGlobalMoney(newMoney);


        setGlobalPointScore(newScore);
        setTimeout(() => {
            deck.reset();
            setDealtCards([]);
            setGenerateCards(false);
            setBestHand('You');


            setTimeout(() => {
                setBestHand('Made');


                setTimeout(() => {
                    setBestHand('$' + hold);


                        setTimeout(() => {
                            if (storeCards[0].purchased) {
                                const prevMoney = holdMoney;
                                holdMoney = holdMoney * 1.2;

                                setBestHand('$' + prevMoney + ' x 1.2 = $' + Math.round(holdMoney));
                            }
                            else {
                                const prevMoney = holdMoney;
                                setBestHand('$' + prevMoney + ' x 1.0 = $' + Math.round(holdMoney));
                            }
                            setTimeout(() => {
                                if (storeCards[1].purchased) {
                                    const prevMoney = holdMoney;
                                    holdMoney = holdMoney + 50;
                                    setBestHand('$' + prevMoney + ' + $50 = $' + Math.round(holdMoney));
                                }
                                else {
                                    const prevMoney = holdMoney;
                                    setBestHand('$' + prevMoney + ' + $0 = $' + Math.round(holdMoney));
                                }
                                setTimeout(() => {
                                    const prevMoney = holdMoney;
                                    holdMoney -= globalAnte;
                                    setBestHand('$' + prevMoney + ' - ' + '$' + globalAnte + ' Ante = $' + Math.round(holdMoney))
                                    setTimeout(() => {

                                        setBestHand('');
                                        setShowPlayButton2(true);

                                    }, wordInterval)

                                }, wordInterval)

                        }, wordInterval)

                    }, wordInterval)

                }, wordInterval)

            }, wordInterval)

        }, 1000);

        
        // Function to use async/await with delay
    }

    const setSelected = (card: Card) => {
        const updatedCards = dealtCards.map(c =>
            c === card ? { ...c, selected: !c.selected } : c
        );
        setDealtCards(updatedCards);
    };

    return (
        <div>
            {showDiscardButton && (
                <button
                    id="discard"
                    className="btn btn-moving-gradient-2 btn-moving-gradient--red"
                    onClick={discardSelected}
                >
                    Discard
                </button>
            )}
            {showPlayButton && (
                <button
                    id="play"
                    className="btn btn-moving-gradient-3 btn-moving-gradient--purple"
                    onClick={playHand}
                >
                    Play Hand
                </button>
            )}
            <div className="card-container">
                {dealtCards.map((card, index) => (
                    <CardDisplay
                        key={index}
                        card={card}
                        onClick={() => setSelected(card)}
                    />
                ))}
            </div>

            <h2 className="bestHandText">{bestHand}</h2>
        </div>
    );
};

export default CardControls;
