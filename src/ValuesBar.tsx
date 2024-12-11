import * as React from "react";
import { useGlobalState } from './GlobalStateContext.tsx';

const ValuesBar: React.FC = () => {
    const { valuesVisible, statsArray } = useGlobalState("statsArray");

    const stats = statsArray[0]; // Assuming the relevant stats object is the first item in the array

    const renderStatButton = (label: string, value: any, color?: string) => (
        <button
            className="btn rounded-full join-item"
            style={{
                margin: "2px",
                fontSize: "12px",
                minWidth: "50px",
                minHeight: "50px",
                color: "white",
                backgroundColor: color || "#333",
            }}
        >
            {label}: {value}
        </button>
    );

    React.useEffect(() => {
        console.log(valuesVisible);
    }, [valuesVisible]);

    // Function to determine if a button should be displayed
    const shouldRenderButton = (label: string, value: any) => {
        if (label.includes("Multiplier")) {
            return value !== 1; // Multiplier condition
        }
        if (label.includes("Adder")) {
            return value !== 0; // Adder condition
        }
        return true; // Default case
    };

    if (!valuesVisible) {
        return (<div></div>);
    }
    return (
        <div style={{ padding: "20px", borderRadius: "8px" }}>
            <div className="join" style={{ marginBottom: "20px" }}>
                {shouldRenderButton("Global Multiplier", stats.GLOBAL_MULTIPLIER) && renderStatButton("Global Multiplier", stats.GLOBAL_MULTIPLIER)}
                {shouldRenderButton("Global Adder", stats.GLOBAL_ADDER) && renderStatButton("Global Adder", stats.GLOBAL_ADDER)}
            </div>

            <div className="join" style={{ marginBottom: "20px" }}>
                {shouldRenderButton("Spades Multiplier", stats.SPADES_MULTIPLIER) && renderStatButton("Spades Multiplier", stats.SPADES_MULTIPLIER)}
                {shouldRenderButton("Spades Adder", stats.SPADES_ADDER) && renderStatButton("Spades Adder", stats.SPADES_ADDER)}
                {shouldRenderButton("Clubs Multiplier", stats.CLUBS_MULTIPLIER) && renderStatButton("Clubs Multiplier", stats.CLUBS_MULTIPLIER)}
                {shouldRenderButton("Clubs Adder", stats.CLUBS_ADDER) && renderStatButton("Clubs Adder", stats.CLUBS_ADDER)}
            </div>

            <div className="join" style={{ marginBottom: "20px" }}>
                {shouldRenderButton("Hearts Multiplier", stats.HEARTS_MULTIPLIER) && renderStatButton("Hearts Multiplier", stats.HEARTS_MULTIPLIER)}
                {shouldRenderButton("Hearts Adder", stats.HEARTS_ADDER) && renderStatButton("Hearts Adder", stats.HEARTS_ADDER)}
                {shouldRenderButton("Diamonds Multiplier", stats.DIAMONDS_MULTIPLIER) && renderStatButton("Diamonds Multiplier", stats.DIAMONDS_MULTIPLIER)}
                {shouldRenderButton("Diamonds Adder", stats.DIAMONDS_ADDER) && renderStatButton("Diamonds Adder", stats.DIAMONDS_ADDER)}
            </div>

            <div className="join" style={{ marginBottom: "20px" }}>
                {shouldRenderButton("Straight Multiplier", stats.STRAIGHT_MULTIPLIER) && renderStatButton("Straight Multiplier", stats.STRAIGHT_MULTIPLIER)}
                {shouldRenderButton("Straight Adder", stats.STRAIGHT_ADDER) && renderStatButton("Straight Adder", stats.STRAIGHT_ADDER)}
                {shouldRenderButton("Flush Multiplier", stats.FLUSH_MULTIPLIER) && renderStatButton("Flush Multiplier", stats.FLUSH_MULTIPLIER)}
                {shouldRenderButton("Flush Adder", stats.FLUSH_ADDER) && renderStatButton("Flush Adder", stats.FLUSH_ADDER)}
            </div>

            <div className="join" style={{ marginBottom: "20px" }}>
                {shouldRenderButton("Full House Multiplier", stats.FULL_HOUSE_MULTIPLIER) && renderStatButton("Full House Multiplier", stats.FULL_HOUSE_MULTIPLIER)}
                {shouldRenderButton("Full House Adder", stats.FULL_HOUSE_ADDER) && renderStatButton("Full House Adder", stats.FULL_HOUSE_ADDER)}
                {shouldRenderButton("Four of a Kind Multiplier", stats.FOUR_OF_A_KIND_MULTIPLIER) && renderStatButton("Four of a Kind Multiplier", stats.FOUR_OF_A_KIND_MULTIPLIER)}
                {shouldRenderButton("Four of a Kind Adder", stats.FOUR_OF_A_KIND_ADDER) && renderStatButton("Four of a Kind Adder", stats.FOUR_OF_A_KIND_ADDER)}
            </div>
        </div>
    );
};

export default ValuesBar;
