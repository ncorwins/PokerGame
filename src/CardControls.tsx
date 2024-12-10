import * as React from 'react';
import { useState } from 'react';
import { Deck } from './Deck/Deck.ts';
import Card from './Deck/Card.ts';
import { evaluateHand, HandRankings } from './Deck/handEvaluator.ts'; // Import the evaluator
import { useGlobalState } from './GlobalStateContext.tsx';
import { calculateHand } from './handCalculator.ts';
import './Deck/CardDisplayContainer.css';
import CardDisplay from './Deck/CardDisplay.tsx';
import './CardControls.css';
import PlayClick from './sound/PlayClick.tsx';
import PlayPop from './sound/PlayPop.tsx';
import ScoreBox from './ScoreBox.tsx';

const CardControls: React.FC = () => {
    const [deck] = useState(new Deck());
    const [dealtCards, setDealtCards] = useState<Card[]>([]);
    const [bestHand, setBestHand] = useState<string>(''); // To store the best hand
    const {doubleQuestMoney, questLevel, setQuestLevel, questArray, setQuestArray, setSortByValue, sortByValue, usedDiscards, setUsedDiscards, totalDiscards, globalAnte, setTwosRemoved, twosRemoved, storeCards, globalCardCount, setGlobalMoney, globalMoney, setShowPlayButton2, generateCards, setGenerateCards, setGlobalPointScore, globalPointScore } = useGlobalState();

    // State variables to manage button visibility
    const [showDiscardButton, setShowDiscardButton] = useState(false);
    const [showStartButton, setShowStartButton] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [showPlayButton, setShowPlayButton] = useState(true);
    const ADDCARDSPEED = 80;



    if (!gameStarted) {
        if (!showStartButton) {
            setShowStartButton(true);
        }
    }


    React.useEffect(() => {
        updatePointTotal();
    }, [dealtCards])



    function updatePointTotal() {
        
    }

    React.useEffect(() => {
        let dealing = false; // Lock to prevent multiple card deals at once

        setSorting();

        if (dealtCards.length > 0) {

            const sortedCards = sortByValue
                ? sortCardsByValue(dealtCards)
                : sortCardsBySuit(dealtCards);

            setDealtCards(sortedCards);
        }



        if (!twosRemoved && storeCards[2]?.purchased) {
            setTwosRemoved(true); // Toggle the twosRemoved state
            deck.setTwosRemoved(true); // Update deck state as well
            //console.log(deck);
        }

        const interval = setInterval(() => {
            if (!generateCards) return;

            deck.shuffle();
            if (dealtCards.length < globalCardCount && !dealing) {
                dealing = true; // Lock dealing
                const card = deck.deal();
                //console.log(gameStarted);
                if (card && gameStarted) {
                    setDealtCards(prevDealtCards => {
                        // Ensure no duplicate cards
                        const isDuplicate = prevDealtCards.some(
                            dealtCard =>
                                dealtCard.rank === card.rank && dealtCard.suit === card.suit
                        );

                        if (!isDuplicate) {
                            const newDealtCards = [...prevDealtCards, card];


                            PlayPop();

                            // Sort the cards based on the suitSorting flag
                            const suitSorting = !sortByValue; // Change this to true to sort by suit
                            return suitSorting
                                ? sortCardsBySuit(newDealtCards)
                                : sortCardsByValue(newDealtCards);
                        }

                        console.warn("Duplicate card detected:", card);
                        return prevDealtCards; // No update if duplicate
                    });
                } else {
                    //console.error("Deck is empty!");
                }
                dealing = false; // Unlock dealing
            }
        }, ADDCARDSPEED);

        return () => {
            clearInterval(interval); // Cleanup interval on unmount
        };
    }, [dealtCards.length, globalCardCount, deck, generateCards, twosRemoved, sortByValue, gameStarted]);

    // Sorting Functions
    const suitOrder: Record<string, number> = {
        spades: 4,
        hearts: 3,
        diamonds: 2,
        clubs: 1,
    };

    const sortCardsBySuit = (cards: Card[]): Card[] => {
        return [...cards].sort((a, b) => {
            const suitComparison = suitOrder[b.suit.toLowerCase()] - suitOrder[a.suit.toLowerCase()];
            if (suitComparison !== 0) {
                return suitComparison; // Sort by suit
            }
            return b.value - a.value; // If suits are the same, sort by value
        });
    };

    const sortCardsByValue = (cards: Card[]): Card[] => {
        return [...cards].sort((a, b) => b.value - a.value);
    };

    function gameOver() {
        setShowPlayButton(false);
        setShowDiscardButton(false);
        //setBestHand('You have lost');
    }

    if (gameStarted) {
        if (dealtCards.length === globalCardCount) {


            if (globalMoney < 0) {
                return;
            }

            if (totalDiscards !== usedDiscards) {
                if (!showDiscardButton) {
                    setShowDiscardButton(true);
                }
            }

            var count = 0;

            for (let i = 0; i < dealtCards.length; i++) {
                if (dealtCards[i].selected) {
                    count++;
                }
            }

            if (count === 5 || totalDiscards === usedDiscards) {
                if (!showPlayButton) {
                    setShowPlayButton(true);
                }
                // 
            }

            if (count !== 5 && showDiscardButton) {
                if (showPlayButton) {
                    setShowPlayButton(false);
                }
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
    }
    else {
        if (showDiscardButton) {
            setShowDiscardButton(false);
        }
        if (showPlayButton) {
            setShowPlayButton(false);
        }
    }

    const sayBestHand = () => {
        const selectedCards = dealtCards.filter(card => card.selected);
        if (selectedCards.length !== 5) {
            setBestHand('Invalid. Please select 5 cards.');
            return (0);
        }

        const handRank = evaluateHand(selectedCards);
        const handName = Object.keys(HandRankings).find(
            key => HandRankings[key as keyof typeof HandRankings] === handRank
        );

        return handName;
    };



    const evaluateBestHand = () => {
        const selectedCards = dealtCards.filter(card => card.selected);
        if (selectedCards.length !== 5) {
            setBestHand('Invalid. Please select 5 cards.');
            return (0);
        }

        const handRank = evaluateHand(selectedCards);
        const points = calculateHand(selectedCards, handRank, storeCards);
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

        setBestHand(handNameNice);
        return points;
    };

    const discardSelected = () => {
        if (totalDiscards === usedDiscards) {
            return;
        }


        const remainingCards = dealtCards.filter(card => !card.selected);
        const removedCards = dealtCards.filter(card => card.selected);

        setBestHand('');
        if (removedCards.length === 0) {
            setBestHand('Please select at least one card.');
            return;
        }

        PlayClick();

        var h = usedDiscards;

        setUsedDiscards(h + 1);


        //console.log(remainingCards);
        //console.log(removedCards);
        removedCards.forEach(card => card.selected = false); // Return discarded cards to the deck
        removedCards.forEach(card => deck.add(card)); // Return discarded cards to the deck
        setDealtCards(remainingCards);
    };


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

                    holder[i].unlocked = true;

                    setQuestArray(holder);  // Update quest array after unlocking
                    if (doubleQuestMoney) {
                        totalQuestMoney += holder[i].reward*2;
                    }
                    totalQuestMoney += holder[i].reward;  // Return the reward for the unlocked quest
                }
            }
        }

        return totalQuestMoney;  // If no match, return 0
    }

    function updateQuests() {
        var holder = questArray;
        var levelUp = true;


        for (let i = 0; i < questArray.length; i++) {
            if (holder[i].level === questLevel) {
                if (holder[i].unlocked === false) {
                    levelUp = false;
                    break;
                }
            }
        }
        if (levelUp) {
            var h = questLevel + 1;
            for (let i = 0; i < questArray.length; i++) {
                if (holder[i].level < h) {
                    holder[i].level = h;
                    holder[i].unlocked = false;
                    holder[i].reward *= 2;
                }
            }
            setQuestLevel(h);
            setQuestArray(holder);
        }
    }



    function calculateMoney(points: number) {

        var updatedPoints = points;

        if (storeCards[0].purchased) {
            console.log("TEST");
            updatedPoints *= 1.2;
        }
        else if (storeCards[1].purchased) {
            console.log("TEST");
            updatedPoints += 50;
        }



        return (updatedPoints);
    }




    const playHand = () => {
        const points = evaluateBestHand();

        if (points === 0) {
            return;
        }

        PlayClick();

        const wordInterval = 700;

        const questMoney = checkQuests();

        const newScore = globalPointScore + points + questMoney;

        setUsedDiscards(0);
        var holderM = globalMoney;
        const newMoney = holderM + calculateMoney(points) + questMoney - globalAnte;
        console.log('Current Money: ' + globalMoney);
        console.log('Calculated Points:' + calculateMoney(points));
        console.log('Quest Money:' + questMoney);
        console.log('Ante:' + globalAnte);
        setGlobalMoney(newMoney);

        updateQuests();

        setGlobalPointScore(newScore);

        setTimeout(() => {
            deck.reset();
            setDealtCards([]);
            setGenerateCards(false);
            setBestHand('You');


            setTimeout(() => {
                setBestHand('Made');


                setTimeout(() => {


                    setTimeout(() => {                    /*
                            if (storeCards[0].purchased) {
                                const prevMoney = Math.round(holdMoney);
                                holdMoney = holdMoney * 1.2;

                                setBestHand('$' + prevMoney + ' x 1.2 = $' + Math.round(holdMoney));
                            }
                            else {
                                const prevMoney = holdMoney;
                                setBestHand('$' + prevMoney + ' x 1.0 = $' + Math.round(holdMoney));
                            }
                            setTimeout(() => {
                                if (storeCards[1].purchased) {
                                    const prevMoney = Math.round(holdMoney);
                                    holdMoney = holdMoney + 50;
                                    setBestHand('$' + prevMoney + ' + $50 = $' + Math.round(holdMoney));
                                }
                                else {
                                    const prevMoney = Math.round(holdMoney);
                                    setBestHand('$' + prevMoney + ' + $0 = $' + Math.round(holdMoney));
                                }
                                setTimeout(() => {
                                    const prevMoney = Math.round(holdMoney);
                                    holdMoney -= globalAnte;
                                    setBestHand('$' + prevMoney + ' - ' + '$' + Math.round(globalAnte) + ' Ante = $' + Math.round(holdMoney))
                                    setTimeout(() => {


                                        if (globalMoney < 0) {
                                            gameOver();
                                            return;
                                        }

                                        setBestHand('');
                                        setShowPlayButton2(true);

                                    }, wordInterval)

                                }, wordInterval)

                        }, wordInterval)*/
                        setBestHand('');
                        if (globalMoney < 0) {
                            gameOver();
                            return;
                        }

                        setShowPlayButton2(true);


                    }, wordInterval)

                    setBestHand('$' + Math.round(calculateMoney(points) + questMoney - globalAnte));

                }, wordInterval)

            }, wordInterval)

        }, 1000);

        
        // Function to use async/await with delay
    }

    const setSelected = (card: Card) => {
        const updatedCards = dealtCards.map(c =>
            c === card ? { ...c, selected: !c.selected } : c
        );

        PlayClick();

        setDealtCards(updatedCards);
    };

    function setSorting() {
        var holder = sortByValue;
        const elem = document.getElementById("sorter");
        if (elem === null) {
            return;
        }

        if (holder) {
            elem.innerHTML = "Sort: Value";
            elem.style.color = 'black';
        }
        else {
            elem.innerHTML = "Sort: Suit";
            elem.style.color = 'white';
        }
    }

    function updateSorting() {
        var holder = sortByValue;
        holder = !holder;

        PlayClick();

        if (holder) {
            document.getElementById("sorter").innerHTML = "Sort: Value";
            document.getElementById("sorter").style.color = 'black';
        }
        else {
            document.getElementById("sorter").innerHTML = "Sort: Suit";
            document.getElementById("sorter").style.color = 'white';
        }

        setSortByValue(holder);
    }

    function startGame() {
        PlayClick();
        if (showStartButton) {
            setShowStartButton(false);
            setGameStarted(true);
        }
    }

    return (
        <div>
            {showStartButton && (
                <button
                    id="play"
                    className="btn btn-moving-gradient btn-moving-gradient--blue"
                    onClick={startGame}
                >
                    Play Hand
                </button>
            )}

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
            {(showPlayButton || showDiscardButton) && (
                <button id="sorter" className="btn btn-moving-gradient btn-moving-gradient--green" onClick={updateSorting}></button>)}
            <h2 className="bestHandText">{bestHand}</h2>
            <ScoreBox dealtCards={dealtCards} />

        </div>
    );
};

export default CardControls;
