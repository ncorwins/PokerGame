import * as React from 'react';
import { useState, useEffect } from 'react';
import { useGlobalState } from './GlobalStateContext.tsx';
import './Store.css';
import PlayCollect from './sound/PlayCollect.tsx';
import PlayClick from './sound/PlayClick.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import SideButtons from './SideButtons.tsx';
import BadLuckText from './BadLuckText.tsx';

const Store: React.FC = () => {
    const { setGenerateCards, globalAnte, setGlobalAnte, roundsCompleted, setRoundsCompleted, setHasPlayed, lookingAtStore, setLookingAtStore, viewingStoreCards, setViewingStoreCards, statsArray, setStatsArray, setShowPlayButton2, hasUnlocked, setHasUnlocked, setGlobalMoney, globalMoney, showBuyButton, globalPointScore, storeCards, setStoreCards, showPlayButton2, setShowBuyButton } = useGlobalState();
    const [helperText, setHelperText] = useState<string>(''); // To store the best hand
    const [luck, setLuck] = useState<string>(''); // To store luck status
    const [luckSet, setLuckSet] = useState<boolean>(false);

    var textType = '';

    const startingAnte = 25;

    const setSelected = (card: any) => {
        if (hasUnlocked) {
            return;
        }

        const updatedCards = viewingStoreCards.map(c =>
            c === card ? { ...c, selected: true } : { ...c, selected: false }
        );
        setViewingStoreCards(updatedCards);
        setShowBuyButton(false);
        for (let i = 0; i < updatedCards.length; i++) {
            if (updatedCards[i].selected && updatedCards[i].unlocked === false) {
                setShowBuyButton(true);
                PlayClick();
            }
        }
    };

    React.useEffect(() => {
        // Populate store cards if none are currently shown
        function formatCardName(name: string) {
            return name
                .toLowerCase() // Convert to lowercase
                .replace(/_/g, ' ') // Replace underscores with spaces
                .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize each word
        }

        // Recalculate luck based on a random seed

        if (viewingStoreCards.length === 0) {
            const newStoreCards = [];


            const seed = Math.random();
            console.log(seed);
            var tempLuck = '';

            if (seed > 0.95) {
                tempLuck = ('god');
            } else if (seed < 0.15) {
                tempLuck = ('bad');
            } else {
                tempLuck = ('');
            }
            tempLuck = tempLuck;
            console.log(tempLuck);

            // Randomly select 3 cards to display in the store
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * storeCards.length);
                const originalName = storeCards[randomIndex];
                const formattedName = formatCardName(originalName);

                const type = formattedName.substring(formattedName.length - 10, formattedName.length);

                var bad_val = 0;
                var bad_text = '';
                var god_val = 0;
                var god_text = '';
                var multi = false;

                if (type === 'Multiplier') {
                    if (tempLuck === 'god') {
                        bad_val = parseFloat((Math.random() * 2 + 1).toFixed(1));
                        god_val = parseFloat((Math.random() * 2 + 3).toFixed(1));
                        god_text = formattedName.substring(0, formattedName.length - 10) + 'Mega Multiplier';
                        bad_text = formattedName.substring(0, formattedName.length - 10) + 'Divider';
                        multi = true;
                    }
                    else {
                        bad_val = parseFloat((Math.random() * 2 + 1).toFixed(1));
                        god_val = parseFloat((Math.random() * 2 + 3).toFixed(1));
                        bad_text = formattedName.substring(0, formattedName.length - 10) + 'Divider';
                        god_text = formattedName.substring(0, formattedName.length - 10) + 'Multiplier';
                        multi = false;
                    }

                } else {
                    if (tempLuck === 'god') {
                        bad_val = parseFloat((Math.random() * 2 + 1).toFixed(1));
                        god_val = parseFloat((Math.random() * 2 + 3).toFixed(1));
                        bad_text = formattedName.substring(0, formattedName.length - 5) + 'Subtractor';
                        god_text = formattedName.substring(0, formattedName.length - 5) + 'Master Adder';
                    }
                    else {
                        bad_val = parseFloat((Math.random() * 2 + 1).toFixed(1));
                        god_val = parseFloat((Math.random() * 2 + 3).toFixed(1));
                        bad_text = formattedName.substring(0, formattedName.length - 5) + 'Subtractor';
                        god_text = formattedName.substring(0, formattedName.length - 5) + 'Adder';
                    }

                }

                newStoreCards.push({
                    name: formattedName, // Use formatted name
                    unlocked: false,
                    selected: false,
                    value: parseFloat((Math.random() * 2 + 1).toFixed(1)),
                    bad_value: bad_val,
                    god_value: god_val,
                    bad_text: bad_text,
                    god_text: god_text,
                    luck_value: tempLuck,
                    is_multi: multi,
                    textType: textType
                });
            }


            // Update the viewing store cards
            setViewingStoreCards(newStoreCards);
        }


    }, [lookingAtStore]); // Added `luck` and `viewingStoreCards` as dependencies to prevent multiple recalculations of luck

    if (globalMoney < 0 && showPlayButton2) {
        return (
            <div className="loss-container">
                <h1 className="lossText">You went broke ${Math.round(globalMoney)}</h1>
                <h1 className="lossText2"> Final Score {globalPointScore}</h1>
                <h1 className="lossText3"> Refresh to play again</h1>
            </div>
        );
    }

    function purchaseItem() {
        // Copy the viewingStoreCards array to avoid direct mutation
        let updatedCards = [...viewingStoreCards];
        let updatedStats = [...statsArray]; // Copy statsArray to avoid direct mutation

        // Helper function to map card names to stat keys
        function getStatKeyFromCardName(cardName: string) {
            // Map formatted names back to their stat keys
            return cardName
                .toUpperCase() // Convert to uppercase
                .replace(/\s+/g, '_'); // Replace spaces with underscores
        }

        // Iterate over cards to check for selection
        updatedCards.forEach((card, index) => {
            if (card.selected) {
                // Reset selection and mark the card as unlocked
                card.selected = false;
                card.unlocked = true;

                // Map card name to the corresponding stat key
                const statKey = getStatKeyFromCardName(card.name);

                if (statKey in updatedStats[0]) {
                    // Increment the stat in statsArray (adjust the increment as needed)

                    if (card.luck_value === 'bad') {

                        if (card.is_multi) {
                            updatedStats[0][statKey] = parseFloat(updatedStats[0][statKey] || 0) / parseFloat(card.bad_value); // Example: Increment stat by 1
                        }
                        else {
                            updatedStats[0][statKey] = parseFloat(updatedStats[0][statKey] || 0) - parseFloat(card.bad_value); // Example: Increment stat by 1
                        }

                    }
                    else if (card.luck_value === 'god') {
                        if (card.is_multi) {
                            updatedStats[0][statKey] = parseFloat(updatedStats[0][statKey] || 0) * parseFloat(card.god_value); // Example: Increment stat by 1
                        }
                        else {
                            updatedStats[0][statKey] = parseFloat(updatedStats[0][statKey] || 0) + parseFloat(card.god_value); // Example: Increment stat by 1
                        }
                    }
                    else {
                        if (card.is_multi) {
                            updatedStats[0][statKey] = parseFloat(updatedStats[0][statKey] || 0) * parseFloat(card.value); // Example: Increment stat by 1
                        }
                        else {
                            updatedStats[0][statKey] = parseFloat(updatedStats[0][statKey] || 0) + parseFloat(card.value); // Example: Increment stat by 1
                        }
                    }
                    updatedStats[0][statKey] = parseFloat(updatedStats[0][statKey].toFixed(1));
                }
                console.log(updatedStats);
                // Play sound effects and update the UI
                PlayClick();
                setHelperText(`Unlocked: ${card.name}`);
                setHasUnlocked(true);
                setLuckSet(false);
                // Schedule collect sound effect after 1 second
                setTimeout(() => PlayCollect(), 1000);
            }

        });

        // Update state with the modified cards and stats
        setViewingStoreCards(updatedCards);
        setStatsArray(updatedStats);

        setTimeout(() => {
            setLookingAtStore(false);
            setHasPlayed(false);

            PlayClick();

            var helper = roundsCompleted;
            setRoundsCompleted(helper += 1);

            var ante = globalAnte;
            setGlobalAnte(Math.round(ante += (startingAnte * (roundsCompleted + 1))));

            if (globalMoney >= 0) {
                setHelperText('');
                setShowPlayButton2(false);
                setShowBuyButton(false);
                setGenerateCards(true);
            }

        }, 2500)
    }

    if (lookingAtStore) {
        if (viewingStoreCards.length != null) {
            if (viewingStoreCards.length > 0) {
                return (
                    <div>
                        <BadLuckText luck={viewingStoreCards[0].luck_value} />

                        {!hasUnlocked && (
                            <button
                                id="purchaseItem"
                                onClick={purchaseItem}
                                className="btn flash-slide flash-slide--orange rounded-lg"
                                style={{ top: '30px' }}
                            >
                                Unlock
                            </button>
                        )}

                        <div className="store-card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                            <AnimatePresence>
                                {viewingStoreCards.map((card, index) => (
                                    <motion.div
                                        style={{ borderWidth: '3px' }}
                                        key={index}
                                        className={`store-card card w-full max-w-sm p-4 transition-all ease-in-out transform ${card.unlocked
                                            ? 'bg-green-500 border-green-600'
                                            : card.selected
                                                ? 'bg-blue-500 border-blue-600'
                                                : 'bg-white border-gray-300'
                                            } border-2 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer`}
                                        onClick={() => setSelected(card)} // Handle card click
                                        initial={{ opacity: 1 }}
                                        animate={{
                                            opacity: hasUnlocked && !card.unlocked ? 0 : 1, // Fade out non-unlocked cards
                                            transition: { opacity: { duration: 1, ease: 'easeOut' } },
                                        }}
                                        exit={{ opacity: 0, transition: { opacity: { duration: 1, ease: 'easeOut' } } }}
                                    >
                                        <div className="store-card-name text-xl font-semibold text-center mb-2">{card.luck_value === 'god' ? card.god_text : card.luck_value === 'bad' ? card.bad_text : card.name}</div>
                                        <div className="store-card-desc text-center text-gray-700" style={{ fontSize: '30px' }}>{card.luck_value === 'god' ? card.god_value : card.luck_value === 'bad' ? card.bad_value : card.value}</div>
                                        <div className="store-card-desc text-center text-gray-700" style={{ fontSize: '10px' }}>Adder's Add Points to Individual Cards</div>
                                        <div className="store-card-desc text-center text-gray-700" style={{ fontSize: '10px' }}>Multi's Multiply Base Score</div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <h2 className="bestHandText2 text-center mt-4 text-lg font-medium text-gray-800">{helperText}</h2>
                    </div>
                );
            }
        }
        
    } else {
        return (
            <div className="store-card-container">
            </div>
        );
    }
};

export default Store;
