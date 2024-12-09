import * as React from 'react';
import './SideButtons.css';
import { useGlobalState } from './GlobalStateContext.tsx';
import { useState } from 'react';
import PlayClick from './sound/PlayClick.tsx';

const Store: React.FC = () => {

    const { setDoubleQuestMoney, usedDiscards, totalDiscards, setTotalDiscards, roundsCompleted, setRoundsCompleted, globalAnte, setGlobalAnte, globalCardCount, setGlobalCardCount, setGlobalMoney, showPlayButton2, setShowPlayButton2, setGenerateCards, globalPointScore, globalMoney, storeCards, setStoreCards, showBuyButton, setShowBuyButton } = useGlobalState();

    const [helperText, setHelperText] = useState<string>(''); // To store the best hand

    const startingAnte = 25;

        const containerStyle = {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: "100vh", // Full viewport height
        };


    function disablePlay() { // restart game
        const btn = document.getElementById("playbutton");

        if (globalMoney < 0) {
            return;
        }

        PlayClick();

        var helper = roundsCompleted;
        setRoundsCompleted(helper += 1);

        var ante = globalAnte;
        setGlobalAnte(Math.round(ante += (startingAnte * (roundsCompleted+1))));

        if (btn != null) {
            if (globalMoney >= 0) {
                setHelperText('');
                setShowPlayButton2(false);
                setShowBuyButton(false);
                setGenerateCards(true);
            }

        }
    }

    function purchaseItem() {
        for (let i = 0; i < storeCards.length; i++) {
            if (storeCards[i].selected) {
                storeCards[i].selected = false;
                setHelperText('');
                if (storeCards[i].purchased) {
                    setHelperText("You already own this upgrade");
                    return;
                }

                if (globalMoney >= storeCards[i].cost) {
                    PlayClick();
                    var money = globalMoney;
                    money -= storeCards[i].cost;
                    setGlobalMoney(money);
                    storeCards[i].level += 1;
                    storeCards[i].purchased = true;
                    setHelperText('Successfully Purchased ' + storeCards[i].name);

                    if (i === 3) {// extra card
                        var holder = globalCardCount;
                        setGlobalCardCount(holder += 1);
                    }

                    if (i === 4) { // extra discard
                        var holder2 = totalDiscards;
                        setTotalDiscards(holder2 += 1);
                    }

                    if (i === 5) {
                        setDoubleQuestMoney(true);
                    }

                    setStoreCards(storeCards);
                }
                else {
                    setHelperText("You do not have enough money");
                }
            }
        }
    }



    return (
        <div style={containerStyle} className="storeWall">
            <button className="btn flash-slide flash-slide--black">Total {Math.round(globalPointScore)}</button>
            <button className="btn flash-slide flash-slide--green">${Math.round(globalMoney)} Bank</button>
            <button className="btn flash-slide flash-slide--red">${Math.round(globalAnte)} Ante</button>
            <button className="btn flash-slide flash-slide--purple">Discards ({totalDiscards-usedDiscards}/{totalDiscards})</button>
            {showPlayButton2 && (
                <button id="playbutton" onClick={disablePlay} className="btn flash-slide flash-slide--blue"> Play </button>
            )}
            {showBuyButton && (
                <button id="purchaseItem" onClick={purchaseItem} className="btn flash-slide flash-slide--orange"> Buy </button>
            )}
            <h2 className="bestHandText2">{helperText}</h2>

        </div >
    );
}

export default Store;
