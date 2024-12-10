import { useState } from 'react';
import * as React from 'react';
import { motion, useAnimation } from 'framer-motion';

const AnimatedBox = () => {
    const controls = useAnimation(); // Use Framer Motion controls

    const animateCardById = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Apply animation to the selected element
            controls.start({
                x: 1000,
                scale: 3,
                opacity: 0,
                transition: { duration: 2 },
            });
        } else {
            console.error(`Element with id "${id}" not found.`);
        }
    };

    return (
        <div>
            <button
                className="btn"
                style={{ color: 'white' }}
                onClick={() => animateCardById('myCard')}
            >
                Animate Card
            </button>

            {/* Example of a card with an id */}
            <motion.div
                id="myCard2"
                initial={{ x: 0, scale: 1, opacity: 1 }}
                animate={controls}
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'blue',
                    margin: 'auto',
                    position: 'relative',
                    top: 100,
                }}
            />
        </div>
    );
};

export default AnimatedBox;
